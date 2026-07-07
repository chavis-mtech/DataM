// Domain — pure types only. No tokio, no serde, no SQL (Iron Rules).
// M0: RowSet is plain strings; the Arrow representation replaces it in M2.

pub mod error;
pub mod query;
pub mod row_set;

pub use error::DbError;
pub use query::Query;
pub use row_set::RowSet;
