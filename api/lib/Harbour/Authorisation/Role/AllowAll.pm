package Harbour::Authorisation::Role::AllowAll;

use common::sense;



sub authorised {
    return 1;
}



1;
