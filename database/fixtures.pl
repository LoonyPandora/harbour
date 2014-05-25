#!/usr/bin/env perl

use lib "../api/lib";
use common::sense;
 
use Harbour::Database::Migrator;

my $fixtures = Harbour::Database::Migrator->new_with_options({
    migrations_dir   => "./fixtures",
    migration_table  => "applied_fixtures",
    schema_file      => "./schema.sql",
});

$fixtures->create_or_update_database();

1;
