package HarbourX::session::modules;

use Dancer ":syntax";
use Data::Dump qw(dump);

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

# Test route with a regex
get qr{^ /session/regex_route/ (?<repo_owner> .+ ) / (?<repo_name> .+ ) $}x => sub {

};


# Lists all routes the currently authenticated user has access to
# Of course they may not be authorised to access the resource at that route - but they can try
get "/session/route_list" => sub {
    my @apps = Dancer::App->applications;
    
    my $route_list = {};
    for my $app ( @apps ) {
        my $routes = $app->{registry}->{routes};

        # TODO: could probably do some fancy map here.
        for my $method (keys %$routes) {
            for my $route (@{ $routes->{$method} }) {
                my $route_key = Harbour::regex_to_route($route->pattern);

                # Only add authorised routes
                if (Harbour::is_authorised($route->pattern, $app->{name})) {
                    $route_list->{$route_key}->{route} = Harbour::regex_to_route($route->pattern);
                    $route_list->{$route_key}->{role} = Harbour::get_authorisation_package($route->pattern, $app->{name});
                    push @{$route_list->{$route_key}->{methods}}, $method;
                }
            }
        }
    }

    return $route_list;
};



get "/session/current" => sub {
    return {
        id => session()->id,
    };
};



1;
