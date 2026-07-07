// Infrastructure — all the speed lives here eventually.
// M2 swaps string rows for Arrow builders across every adapter below.

pub mod mariadb;
pub mod sqlite;

pub use mariadb::MariaDbExecutor;
pub use sqlite::SqliteExecutor;
