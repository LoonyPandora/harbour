#!/usr/bin/env perl

use lib "../api/lib";
use common::sense;
 
use Harbour::Database::Migrator;

my $asdf = Harbour::Database::Migrator->new_with_options({
    migrations_dir   => "./migrations",
    migration_table  => "applied_migration",
    schema_file      => "./schema.sql",
});

$asdf->create_or_update_database();

1;
