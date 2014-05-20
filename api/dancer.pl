#!/usr/bin/env perl

use Dancer;
use Harbour;
use common::sense;
use Path::Tiny qw(path);
use Module::Load qw();
use JSON::XS;
use File::Slurp;
use Try::Tiny;

# Get a list of all installed modules and load them one-by-one
my $moduledir = path(dirname(__FILE__), "../modules");

for my $module ($moduledir->children) {
    if ( $module->is_dir && $module->child("lib", "HarbourX")->is_dir ) {
        push @INC, $module->child("lib")->realpath->stringify;
        load_app("HarbourX::".$module->basename);
    }

    if ( $module->is_dir && $module->child("config", "authorisation.json")->is_file ) {
        my $auth = decode_json(
            read_file($module->child("config", "authorisation.json")->realpath->stringify)
        );

        for my $auth_module (@{$auth->{authorisation}}) {
            my $module = $auth_module->{type} =~ s/[^A-Za-z:]//rg;

            try {
                Module::Load::load($module)
            } catch {
                warn "Couldn't load Authorisation module for route: " . $auth_module->{route} . " Module: $module";
            };
        }
    }
}

# Tell Dancer about where we store our config
set "confdir" => path(dirname(__FILE__), "config")->stringify;
set "envdir"  => path(dirname(__FILE__), "config/environments")->stringify;

dance();
