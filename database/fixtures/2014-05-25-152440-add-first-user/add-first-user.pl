sub {
    use Data::UUID::MT;
    use Crypt::Bcrypt::Easy;

    my $migrator = shift;

    my $uuid = Data::UUID::MT->new(version => 4)->create_string();
    my $username = 'loonypandora@gmail.com';
    my $password = "{CRYPT}" . bcrypt->crypt( text => "password", cost => 8 );;

    my $sth = $migrator->dbh()->prepare(q{
        INSERT INTO user (uuid, username, password)
        VALUES (?, ?, ?)
    });

    $sth->execute($uuid, "loonypandora", $password);

    $sth->finish();
}
