package MaestroX::session;

use Dancer ':syntax';
use common::sense;

get '/session' => sub {
    return {
        "Hello" => "World"
    }
};

true;
