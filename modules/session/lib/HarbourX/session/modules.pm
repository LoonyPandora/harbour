package HarbourX::session::modules;

use Dancer ":syntax";
use Data::Dump qw(dump);

use common::sense;


sub enabled_modules {
    # FIXME: Of course, this needs to be stored in a DB, and only load enabled perl modules
    # Those enabled perl modules are done at an admin level during app startup.
    my @enabled_modules = qw(session webui documentation);

    return \@enabled_modules;
}


get "/session/modules" => sub {
    return enabled_modules();
};

# Test route with a regex
get qr{^ /session/regex_route/ (?<repo_owner> .+ ) / (?<repo_name> .+ ) $}x => sub {

};


get "/session/current" => sub {
    return {
        id => session()->id,
    };
};



1;
