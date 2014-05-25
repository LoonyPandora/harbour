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

    my $user = $sth->fetchall_hashref([]);

    unless ( $user->{id} && passphrase( $password )->matches( $user->{password} ) ) {
        return undef;
    }

    session "user_id"  => $user->{id};
    session "username" => $user->{username};

    return {
        session => session "id",
    }
}


post "/session/login" => sub {
    my $username = param("username");
    my $password = param("password");

    unless ( ($username && $password) && ($username ne '' && $password ne '') ) {
        status 401;
        return halt "Need a username & password.";
    }

    my $authenticated = is_authenticated($username, $password);

    unless ($authenticated) {
        status 401;
        return halt "Bad username / password.";
    }

    return $authenticated;
};

