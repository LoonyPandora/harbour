package Harbour;

use Dancer ':syntax';
use Data::Dump qw(dump);
use Try::Tiny;
use Module::Load qw();

use common::sense;


# Returns the class for checking whether a user is authorised
# to access this route with the given arguments
sub is_authorised {
    my ($route, $app) = @_;

    # Route might be a regex, so munge it to /route/:param format
    $route = regex_to_route($route);

    my $auth_package = get_authorisation_package($route, $app);

    # Without an entry, default to deny.
    unless ($auth_package) {
        status 401;
        return halt "No Auth Package for $route, $app";
    }

    # If we have an entry, try to load it and run it.
    try {
        Module::Load::load($auth_package);
    } catch {
        die "Couldn't load authorisation module for Route: $route App: $app Perl Module: $auth_package";
    };

    # Now lets try and run the authorised method
    return $auth_package->authorised();
}



# Given a route and the current app, will return the package / class that will say whehter a user has access
sub get_authorisation_package {
    my ($route, $app) = @_;

    # Just in case we've been passed a regex - check and munge
    $route = regex_to_route($route);

    # This setting is dynamically generated on app startup by reading all modules
    my $route_authorisation = setting("route_authorisation");

    # Find the relevent entry in the file, and we'll try to load it first
    my $auth_package = $route_authorisation->{$app}->{$route};

    return $auth_package;
}



# Takes a route regex, turns it into /route/:param format
sub regex_to_route {
    my ($route) = @_;

    # Check that is absolutely for sure a regex.
    # TODO: Be nice if Perl had a proper Type.
    if ($route =~ /\Q?^ux:\E/) {
        # Strip the perl regexp flags
        $route =~ s/\Q?^ux:\E//g;
        # Strip negative lookaheads
        $route =~ s/ \( \? ! [^)]+ \) //gx;
        # Change named captures to :params
        $route =~ s/ \( \? < ([\w]+) >.*? \) /:$1/gx;
        # Anything left is nonsense that can be ignored.
        $route =~ s/[^\/:\w]//g;
    }

    return $route;
}


# Lists ALL Routes that the currently authenticated user has access to.
# Useful for the root, an also for the documentation browser
sub route_list {
    my @apps = Dancer::App->applications;

    my $route_list = {};
    for my $app ( @apps ) {
        my $routes = $app->{registry}->{routes};

        # TODO: could probably do some fancy map here.
        for my $method (keys %$routes) {
            for my $route (@{ $routes->{$method} }) {
                my $route_key = regex_to_route($route->pattern);

                # Only add authorised routes
                if (is_authorised($route->pattern, $app->{name})) {
                    $route_list->{$route_key}->{route} = regex_to_route($route->pattern);
                    $route_list->{$route_key}->{role} = get_authorisation_package($route->pattern, $app->{name});
                    push @{$route_list->{$route_key}->{methods}}, $method;
                }
            }
        }
    }

    return $route_list;
}


# This runs the authorisation method for every route, loading the module if necessary
hook 'before' => sub {
    my $route = shift;

    my $app = Dancer::App->current()->{name};

    unless ($route) {
        status 404;
        return halt "No Route Found.";
    }

    # TODO: Add check for malformed JSON and correct headers
    unless ( is_authorised($route->pattern(), $app) ) {
        status 401;
        return halt "Not Authorised to access that route";
    }
};

1;

