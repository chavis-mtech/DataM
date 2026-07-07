// HTTP adapter — depends on the application port (RunQuery), never on
// infrastructure concretes. M0 ships JSON; binary Arrow over WS arrives in M2.

use std::sync::Arc;
use std::time::Instant;

use axum::extract::State;
use axum::http::StatusCode;
use axum::routing::post;
use axum::{Json, Router};
use serde::{Deserialize, Serialize};
use tower_http::cors::CorsLayer;

use crate::application::RunQuery;
use crate::domain::Query;

#[derive(Clone)]
pub struct AppState {
    /// One `RunQuery` per engine. Same interactor, different infra adapter
    /// injected underneath — this is the whole point of the port/adapter seam.
    pub sqlite: Arc<RunQuery>,
    pub mariadb: Arc<RunQuery>,
}

#[derive(Deserialize)]
pub struct QueryRequest {
    pub sql: String,
    #[serde(default = "default_engine")]
    pub engine: String,
}

fn default_engine() -> String {
    "sqlite".to_string()
}

#[derive(Serialize)]
pub struct QueryResponse {
    pub columns: Vec<String>,
    pub rows: Vec<Vec<String>>,
    pub row_count: usize,
    pub elapsed_ms: f64,
}

#[derive(Serialize)]
pub struct ErrorResponse {
    pub error: String,
}

pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/query", post(run_query))
        .layer(CorsLayer::permissive())
        .with_state(state)
}

async fn run_query(
    State(state): State<AppState>,
    Json(req): Json<QueryRequest>,
) -> Result<Json<QueryResponse>, (StatusCode, Json<ErrorResponse>)> {
    let started = Instant::now();

    let run_query = match req.engine.as_str() {
        "mariadb" | "mysql" => &state.mariadb,
        _ => &state.sqlite,
    };

    match run_query.execute(Query { sql: req.sql }).await {
        Ok(row_set) => Ok(Json(QueryResponse {
            row_count: row_set.rows.len(),
            columns: row_set.columns,
            rows: row_set.rows,
            elapsed_ms: started.elapsed().as_secs_f64() * 1000.0,
        })),
        Err(e) => Err((
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse { error: e.to_string() }),
        )),
    }
}
