package HarbourX::session::login;

use Dancer ":syntax";
use Dancer::Plugin::Passphrase;
use Dancer::Plugin::Database;
use Data::Dump qw(dump);

use common::sense;


sub is_authenticated {
    my ($username, $password) = @_;

    my $sth = database->prepare(q{
        SELECT id, uuid, username, password
        FROM user
        WHERE username = ?
        LIMIT 1
    });

    $sth->execute($username);

    die dump $sth->fetchall_arrayref({});

    return $sth->fetchall_arrayref({});
}


post "/session/login" => sub {
    # my $phrase = passphrase( param("password") )->generate;

    my $username = param("username");
    my $password = param("password");
    
    is_authenticated($password);

    # $phrase is now an object that contains RFC 2307 representation
    # of the hashed passphrase, along with the salt, and other metadata
     
    # You should store $phrase->rfc2307() for use later
    
    return {
        password => param("password")
    }
};

