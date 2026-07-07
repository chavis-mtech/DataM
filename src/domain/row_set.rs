/// Query result. M0 deliberately stores everything as strings —
/// this becomes `{ schema, batches: Vec<RecordBatch> }` in M2 (Arrow Spine).
#[derive(Debug, Default)]
pub struct RowSet {
    pub columns: Vec<String>,
    pub rows: Vec<Vec<String>>,
}
