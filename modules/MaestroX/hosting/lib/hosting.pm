package MaestroX::hosting;

use Dancer ":syntax";
use Data::UUID;

use common::sense;


# Returns a list of all hosting accounts
get "/hosting" => sub {

    #  Simulate slow network
    sleep(5);

    # Need to show the domains so we can filter it in the model quicksearch
    return [
        {
            id => Data::UUID->new->create_str(),
            domains => [
                "foobar.com",
                "bazinga.com",
                "blahblahblah.co.uk",
            ]
        },
        {
            id => Data::UUID->new->create_str(),
            domains => [
                "blahblahblah.co.uk",
            ]
        },
    ];

};


# Returns details of a specific hosting account
get "/hosting/:uuid" => sub {

    return {
        id => params->{uuid},
        domains => [
            "foobar.com",
            "bazinga.com",
            "blahblahblah.co.uk",
        ],
        login => {
            key  => "asdfjawhjnvljajksdvnasvnwnfoijg",
            port => 2345,
        },
        allowance => {
            bandwidth => {
                used => 123,
                total => 999,
            },
            space => {
                used => 123,
                total => 999,
            }
        },
        installed_apps => [
            "wordpress",
            "drupal",
            "magento",
            "indexhibit",
        ]
    }

};


# Adds a new hosting account
post "/hosting" => sub {

};


# Updates part of a hosting account
patch "/hosting/:uuid" => sub {

};


# Updates an entire hosting account
put "/hosting/:uuid" => sub {

};


true;
