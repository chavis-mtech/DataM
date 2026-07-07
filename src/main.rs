//! Composition root — the only place where concrete types meet (Layer Map).

use std::sync::Arc;

use datam::application::RunQuery;
use datam::infrastructure::{MariaDbExecutor, SqliteExecutor};
use datam::presentation::adapters::http::{AppState, router};

#[tokio::main]
async fn main() {
    let db_path = std::env::args().nth(1).unwrap_or_else(|| "test.db".to_string());
    let addr = "127.0.0.1:8080";

    let sqlite = Arc::new(RunQuery::new(Arc::new(SqliteExecutor::new(&db_path))));

    // Test credentials for the local dev MariaDB instance (M1 will replace
    // this with a real connection-manager UI instead of a hardcoded DSN).
    let mariadb = Arc::new(RunQuery::new(Arc::new(MariaDbExecutor::new(
        "127.0.0.1",
        3306,
        "root",
        "1234",
        None,
    ))));

    let app = router(AppState { sqlite, mariadb });

    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect("failed to bind");

    println!("DataM M0 — serving {db_path} on http://{addr} (POST /query)");
    axum::serve(listener, app).await.expect("server error");
}
