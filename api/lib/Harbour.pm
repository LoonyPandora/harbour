package Harbour;

use Dancer ':syntax';
use Data::Dump qw(dump);
use Try::Tiny;
use Module::Load qw();

use common::sense;


# Returns the class for checking whether a user is authorised
# to access this route with the given arguments
sub is_authorised {
    my ($route, $harbour_module) = @_;

     # route is a regex, so munge it
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

    # This setting is dynamically generated on app startup by reading all modules
    my $route_authorisation = setting("route_authorisation");

    # Find the relevent entry in the file, and we'll try to load it first
    my $auth_package = $route_authorisation->{$harbour_module}->{$route};

    # Without an entry, default to deny.
    unless ($auth_package) {
        status 401;
        return halt "Sorry, I can't do that.";
    }

    # If we have an entry, try to load it and run it.
    try {
        Module::Load::load($auth_package);
    } catch {
        die "Couldn't load authorisation module for Route: $route Harbour Module: $harbour_module Perl Module: $auth_package";
    };

    # Now lets try and run the authorised method
    unless ($auth_package->authorised()) {
        status 401;
        return halt "Sorry, I can't do that.";
    }
}


# This runs the authorisation method for every route, loading the module if necessary
hook 'before' => sub {
    my $route = shift;
    my ($module) = request()->path =~ m{^/(\w+)/};


    unless ($route) {
        status 401;
        return halt "Sorry, I can't do that.";
    }

    # TODO: Add check for malformed JSON and correct headers

    is_authorised($route->pattern(), $module);
};

1;

