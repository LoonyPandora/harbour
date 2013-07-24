#!/usr/bin/env perl

use Dancer;
use Maestro;
use common::sense;
use Data::Dump qw(dump);
use Path::Tiny qw(path);

# Get a list of all installed modules and load them one-by-one
my $moduledir = path( dirname(__FILE__), "../gui/modules/MaestroX");

for my $module ($moduledir->children) {
    if ( $module->is_dir && $module->child("lib", $module->basename . ".pm")->is_file ) {
        push @INC, $module->child("lib")->stringify;
        load_app($module->basename);
    }
}

# Tell Dancer about where we store our config
set "confdir" => path(dirname(__FILE__), "config")->stringify;
set "envdir"  => path(dirname(__FILE__), "config/environments")->stringify;

dance();
