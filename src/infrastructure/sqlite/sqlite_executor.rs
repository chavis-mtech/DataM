use std::path::PathBuf;

use rusqlite::types::ValueRef;
use rusqlite::{Connection, OpenFlags};

use crate::application::QueryExecutor;
use crate::domain::{DbError, Query, RowSet};

/// SQLite adapter. rusqlite is synchronous, so every call runs inside
/// `spawn_blocking` — never on the tokio reactor threads (Risks and Gotchas).
pub struct SqliteExecutor {
    path: PathBuf,
}

impl SqliteExecutor {
    pub fn new(path: impl Into<PathBuf>) -> Self {
        Self { path: path.into() }
    }
}

#[async_trait::async_trait]
impl QueryExecutor for SqliteExecutor {
    async fn run(&self, query: &Query) -> Result<RowSet, DbError> {
        let path = self.path.clone();
        let sql = query.sql.clone();

        tokio::task::spawn_blocking(move || execute(&path, &sql))
            .await
            .map_err(|e| DbError::Internal(e.to_string()))?
    }
}

fn execute(path: &PathBuf, sql: &str) -> Result<RowSet, DbError> {
    // READ_WRITE without CREATE: a wrong path should error, not silently
    // create an empty database.
    let conn = Connection::open_with_flags(
        path,
        OpenFlags::SQLITE_OPEN_READ_WRITE | OpenFlags::SQLITE_OPEN_NO_MUTEX,
    )
    .map_err(|e| DbError::Connection(e.to_string()))?;

    let mut stmt = conn
        .prepare(sql)
        .map_err(|e| DbError::Query(e.to_string()))?;

    let columns: Vec<String> = stmt.column_names().iter().map(|c| c.to_string()).collect();
    let ncols = columns.len();

    let mut out_rows = Vec::new();
    let mut rows = stmt.query([]).map_err(|e| DbError::Query(e.to_string()))?;
    while let Some(row) = rows.next().map_err(|e| DbError::Query(e.to_string()))? {
        let mut cells = Vec::with_capacity(ncols);
        for i in 0..ncols {
            let value = row.get_ref(i).map_err(|e| DbError::Query(e.to_string()))?;
            cells.push(cell_to_string(value));
        }
        out_rows.push(cells);
    }

    Ok(RowSet { columns, rows: out_rows })
}

// M0 only: everything becomes a String. Arrow builders replace this in M2.
fn cell_to_string(value: ValueRef<'_>) -> String {
    match value {
        ValueRef::Null => "NULL".to_string(),
        ValueRef::Integer(i) => i.to_string(),
        ValueRef::Real(f) => f.to_string(),
        ValueRef::Text(t) => String::from_utf8_lossy(t).into_owned(),
        ValueRef::Blob(b) => format!("<blob {} bytes>", b.len()),
    }
}
