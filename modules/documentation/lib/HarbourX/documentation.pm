package HarbourX::documentation;

use Dancer ":syntax";
use common::sense;


# Lists all routes the currently authenticated user has access to
# Of course they may not be authorised to access the resource at that route - but they can try
get "/documentation/route_list" => sub {
    my @route_list = values Harbour::route_list();

    return {
        routes => \@route_list
    };
};


1;
