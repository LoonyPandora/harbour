package MaestroX::session;

use Dancer ":syntax";
use common::sense;

my @all_js = (
    "js/jquery.js",                "js/holder.js",
    "js/bootstrap.js",             "js/hashgrid.js",
    "js/jquery.easy-pie-chart.js", "js/main.js",
);

my @all_css = (
    "css/bootstrap.css",        "css/font-awesome.css",
    "css/bootstrap-custom.css", "css/hashgrid.css",
    "css/animate.css",          "css/jquery.easy-pie-chart.css",
    "css/structure.css",        "css/header.css",
    "css/module-list.css",      "css/collection-list.css",
    "css/subnav.css",           "css/content.css",
    "css/form.css",             "css/utilities.css",
    "css/skin.css",
);

get "/session/js" => sub {
    return \@all_js;
};

get "/session/css" => sub {
    return \@all_css;
};


# HTML output because nginx is purposefully dumb
# FIXME: Write a proper serializer here instead of hardcoding
get "/session/js.html" => sub {
    my @output_js;
    for my $js (@all_js) {
        push @output_js, qq{<script src="$js"></script>};
    }

    set serializer => undef;
    return join "\n", @output_js;
};


get "/session/css.html" => sub {
    my @output_css;
    for my $css (@all_css) {
        push @output_css, qq{<link href="$css" rel="stylesheet">};
    }

    set serializer => undef;
    return join "\n    ", @output_css;
};




true;
