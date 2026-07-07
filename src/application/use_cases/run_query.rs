// Application — ports + interactors. No SQL and no sockets in here (Iron Rules).

use std::sync::Arc;

use crate::domain::{DbError, Query, RowSet};

/// Port: something that can execute a query and hand back rows.
/// Infrastructure provides the concrete impls (SQLite now, Postgres in M1).
#[async_trait::async_trait]
pub trait QueryExecutor: Send + Sync {
    async fn run(&self, query: &Query) -> Result<RowSet, DbError>;
}

/// Interactor: the one entry point every shell (http/cli/tauri) calls.
pub struct RunQuery {
    executor: Arc<dyn QueryExecutor>,
}

impl RunQuery {
    pub fn new(executor: Arc<dyn QueryExecutor>) -> Self {
        Self { executor }
    }

    pub async fn execute(&self, query: Query) -> Result<RowSet, DbError> {
        self.executor.run(&query).await
    }
}
