package HarbourX::documentation;

use Dancer ":syntax";
use common::sense;

use Data::Dump qw(dump);

# Lists all routes the currently authenticated user has access to
# Of course they may not be authorised to access the resource at that route - but they can try
get "/documentation/route" => sub {
    my @route_list = values Harbour::route_list();

    return {
        routes => \@route_list
    };
};



# Route that returns information on a single route
get qr{^ /documentation/route/ (?<route_name> .+ ) $}x => sub {
    my $route_list = Harbour::route_list();

    return $route_list->{"/".captures->{route_name}};
};



1;
