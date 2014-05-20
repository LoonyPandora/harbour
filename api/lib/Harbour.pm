package Harbour;

use Dancer ':syntax';
use Data::Dump qw(dump);
use common::sense;

hook 'before' => sub {
    # die dump Dancer::App->current;
    # request->path_info('/foo/oversee')
};

1;

