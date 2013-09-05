package HarbourX::hosts;

use Dancer ":syntax";
use Data::UUID;

use common::sense;


# Returns a list of all hosting accounts
get "/hosts" => sub {

    #  Simulate slow network
    sleep(1);

    # Need to show the domains so we can filter it in the model quicksearch
    return [
        {
            id => Data::UUID->new->create_str()
        },
        {
            id => Data::UUID->new->create_str(),
        },
    ];

};


# Returns details of a specific hosting account
get "/hosts/:uuid" => sub {

    return {
        id => params->{uuid},
    }

};


# Adds a new docker host
post "/hosts" => sub {

};


# Updates part of a hosting account
# Will just delegate to the Docker API
put "/hosts/:uuid" => sub {

};


true;
