use std::fmt;

#[derive(Debug)]
pub enum DbError {
    /// Failed to open or reach the database.
    Connection(String),
    /// The query itself failed (syntax, missing table, ...).
    Query(String),
    /// Anything else (task join, cancellation, ...).
    Internal(String),
}

impl fmt::Display for DbError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            DbError::Connection(msg) => write!(f, "connection error: {msg}"),
            DbError::Query(msg) => write!(f, "query error: {msg}"),
            DbError::Internal(msg) => write!(f, "internal error: {msg}"),
        }
    }
}

impl std::error::Error for DbError {}
