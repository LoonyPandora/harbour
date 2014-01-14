package Harbour::Log;

use Dancer ":syntax";
use Dancer::Plugin::Database;

use common::sense;



sub log_api_request {
    my ($params) = @_;

    my $log = database->prepare(q{
        INSERT INTO logs (URL, received_headers, received_data)
        VALUES (?, ?, ?)
    });

    my $success = $log->execute($params->{from_url}, $params->{received_headers}, $params->{received_data});

    # FIXME: Exception handling
    if (!$success) {
        die "couldn't log";
    }

}



1;
