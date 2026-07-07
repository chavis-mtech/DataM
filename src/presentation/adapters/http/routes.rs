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
    pub run_query: Arc<RunQuery>,
}

#[derive(Deserialize)]
pub struct QueryRequest {
    pub sql: String,
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

    match state.run_query.execute(Query { sql: req.sql }).await {
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
