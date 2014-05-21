package Harbour::Database::Migrator;

use Moose;
use Data::Dump qw(dump);

extends "Database::Migrator::mysql";


has "+database" => (
    required => 1,
    default  => "harbour",
);

has "+host" => (
    required => 1,
    default  => "127.0.0.1",
);

has "+port" => (
    required => 1,
    default  => "3306",
);

has "+username" => (
    required => 1,
    default  => "root",
);

has "+password" => (
    required => 1,
    default  => undef,
);

has "+schema_file" => (
    required => 0,
    default  => "",
);


sub _create_database {
    my $self = shift;
 
    my $database = $self->database();
 
    $self->logger()->info("Creating the $database database");
 
    my $create_ddl = "CREATE DATABASE IF NOT EXISTS $database";
    $create_ddl .= ' CHARACTER SET = ' . $self->character_set()
        if $self->_has_character_set();
    $create_ddl .= ' COLLATE = ' . $self->collation()
        if $self->_has_collation();
 
    $self->_run_command(
        [ $self->_cli_args(), qw(  --batch -e ), $create_ddl ] );
 
    return;
}


sub _build_dbh {
    my $self = shift;

    return DBI->connect(
        'dbi:' .
        $self->_driver_name() .
        ':database=' . $self->database() .
        ';host=' . $self->host() .
        ';port=' .  $self->port() . ';',
        $self->username(),
        $self->password(),
        {
            RaiseError         => 1,
            PrintError         => 1,
            PrintWarn          => 1,
            ShowErrorStatement => 1,
        },
    );
}



1;