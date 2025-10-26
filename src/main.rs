//! RoverDB Hello (Colorful)
//! Prints a colorful banner with a crab emoji and short descriptions (EN/TH).

use owo_colors::OwoColorize;

fn divider() {
    println!("{}", "────────────────────────────────────────────────────────".bright_black());
}

fn main() {
    // Title
    println!("{}  {}", "🦀".bright_red(), "RoverDB-Client".bold().bright_cyan());
    divider();

    // English description
    println!("{}", "Description:".bold().bright_magenta());
    println!("  {}", "High-performance row-level DB client — zero-copy I/O, snapshots & rescue for PostgreSQL/SQLite.".bright_green());
    println!("  {}", "Clean Architecture (Ports & Adapters) — Rust + Tauri + SolidJS.".bright_blue());

    divider();
    println!("{} {}", "Tip:".bold().bright_magenta(), "Run with `cargo run`".bright_white());
}
