package HarbourX::session::modules;

use Dancer ":syntax";
use common::sense;


sub enabled_modules {
    # FIXME: Of course, this needs to be stored in a DB, and only load enabled perl modules
    # Those enabled perl modules are done at an admin level during app startup.
    my @enabled_modules = qw(session webui);

    return \@enabled_modules;
}


get "/session/modules" => sub {
    return enabled_modules();
};


get "/session/current" => sub {
    return {
        id => session()->id,
    };
};



1;
