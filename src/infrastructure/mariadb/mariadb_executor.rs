use mysql_async::prelude::*;
use mysql_async::{Opts, OptsBuilder, Pool, Row, Value};

use crate::application::QueryExecutor;
use crate::domain::{DbError, Query, RowSet};

/// MariaDB/MySQL adapter. Native wire protocol via `mysql_async` — no
/// libmysqlclient, no JDBC. Every query goes through COM_STMT_PREPARE +
/// COM_STMT_EXECUTE (binary protocol), not the text COM_QUERY path, so
/// numeric/date columns arrive as typed values instead of ASCII to parse.
pub struct MariaDbExecutor {
    pool: Pool,
}

impl MariaDbExecutor {
    pub fn new(host: &str, port: u16, user: &str, password: &str, db_name: Option<&str>) -> Self {
        let opts = OptsBuilder::default()
            .ip_or_hostname(host)
            .tcp_port(port)
            .user(Some(user))
            .pass(Some(password))
            .db_name(db_name);
        Self { pool: Pool::new(Opts::from(opts)) }
    }
}

#[async_trait::async_trait]
impl QueryExecutor for MariaDbExecutor {
    async fn run(&self, query: &Query) -> Result<RowSet, DbError> {
        let mut conn = self
            .pool
            .get_conn()
            .await
            .map_err(|e| DbError::Connection(e.to_string()))?;

        let stmt = conn
            .prep(&query.sql)
            .await
            .map_err(|e| DbError::Query(e.to_string()))?;

        let columns: Vec<String> = stmt
            .columns()
            .iter()
            .map(|c| c.name_str().into_owned())
            .collect();

        let rows: Vec<Row> = conn
            .exec(&stmt, ())
            .await
            .map_err(|e| DbError::Query(e.to_string()))?;

        let out_rows = rows
            .iter()
            .map(|row| (0..row.len()).map(|i| cell_to_string(row.as_ref(i))).collect())
            .collect();

        Ok(RowSet { columns, rows: out_rows })
    }
}

// M0 parity only: everything becomes a String. Arrow builders replace this in M2.
fn cell_to_string(value: Option<&Value>) -> String {
    match value {
        None | Some(Value::NULL) => "NULL".to_string(),
        Some(Value::Bytes(b)) => String::from_utf8_lossy(b).into_owned(),
        Some(Value::Int(i)) => i.to_string(),
        Some(Value::UInt(u)) => u.to_string(),
        Some(Value::Float(f)) => f.to_string(),
        Some(Value::Double(d)) => d.to_string(),
        Some(Value::Date(y, mo, d, h, mi, s, us)) => {
            if *us == 0 {
                format!("{y:04}-{mo:02}-{d:02} {h:02}:{mi:02}:{s:02}")
            } else {
                format!("{y:04}-{mo:02}-{d:02} {h:02}:{mi:02}:{s:02}.{us:06}")
            }
        }
        Some(Value::Time(neg, days, h, mi, s, us)) => {
            let sign = if *neg { "-" } else { "" };
            let hours = u64::from(*days) * 24 + u64::from(*h);
            if *us == 0 {
                format!("{sign}{hours:02}:{mi:02}:{s:02}")
            } else {
                format!("{sign}{hours:02}:{mi:02}:{s:02}.{us:06}")
            }
        }
    }
}
