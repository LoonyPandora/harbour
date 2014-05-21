#!/usr/bin/env perl

use Dancer;
use Harbour;
use common::sense;
use Path::Tiny qw(path);
use JSON::XS;

# Get a list of all installed modules and load them one-by-one
my $moduledir = path(dirname(__FILE__), "../modules");

# Get a structure for all routes
my $route_authorisation = {};

for my $module ($moduledir->children) {
    if ( $module->is_dir && $module->child("lib", "HarbourX")->is_dir ) {
        push @INC, $module->child("lib")->realpath->stringify;
        load_app("HarbourX::".$module->basename);
    }

    # Load the authorisation file and later we'll make it a setting run on a before filter
    if ( $module->is_dir && $module->child("config", "authorisation.json")->is_file ) {
        my $auth = decode_json(
            $module->child("config", "authorisation.json")->slurp_utf8
        );

        $route_authorisation->{$module->basename} = $auth;
    }
}

# Tell Dancer about where we store our config
set "confdir" => path(dirname(__FILE__), "config")->stringify;
set "envdir"  => path(dirname(__FILE__), "config/environments")->stringify;

set "route_authorisation" => $route_authorisation;


dance();
