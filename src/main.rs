//! Composition root — the only place where concrete types meet (Layer Map).

use std::sync::Arc;

use datam::application::RunQuery;
use datam::infrastructure::SqliteExecutor;
use datam::presentation::adapters::http::{AppState, router};

#[tokio::main]
async fn main() {
    let db_path = std::env::args().nth(1).unwrap_or_else(|| "test.db".to_string());
    let addr = "127.0.0.1:8080";

    let executor = Arc::new(SqliteExecutor::new(&db_path));
    let run_query = Arc::new(RunQuery::new(executor));
    let app = router(AppState { run_query });

    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect("failed to bind");

    println!("DataM M0 — serving {db_path} on http://{addr} (POST /query)");
    axum::serve(listener, app).await.expect("server error");
}
