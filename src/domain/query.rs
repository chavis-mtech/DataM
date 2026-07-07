/// A query as the user wrote it. Params/pagination arrive in later milestones.
#[derive(Debug, Clone)]
pub struct Query {
    pub sql: String,
}
