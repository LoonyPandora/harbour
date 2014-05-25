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
        return halt "No Auth Package";
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

