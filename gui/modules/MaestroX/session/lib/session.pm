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


# HTML output because nginx is purposefully dumb and can't turn JSON -> HTML
# FIXME: Write a proper serializer here instead of hardcoding
get "/session/js.min.html" => sub {
    # FIXME: benchmark performance;
    my $combined;
    for my $file (@all_js) {
        $combined .= "\n\n// $file\n//==============================\n\n";
        $combined .= path("/Library/WebServer/Documents/maestro/mockups/html/v3/", $file)->slurp;
    }

    # First 9 chars of the SHA is enough for git, so it's enough for us.
    my $filename = substr(Digest::SHA::sha1_hex($combined), 0, 9) . ".js";

    path("/Library/WebServer/Documents/maestro/mockups/html/v3/cache/", $filename)->spew($combined);

    # FIXME: Hardcoded for the demo
    return qq{<script src="cache/$filename"></script>}
};


get "/session/css.min.html" => sub {
    # FIXME: benchmark performance;
    my $combined;
    for my $file (@all_css) {
        $combined .= "\n\n/* $file\n ============================== */\n\n";
        $combined .= path("/Library/WebServer/Documents/maestro/mockups/html/v3/", $file)->slurp;
    }

    # First 9 chars of the SHA is enough for git, so it's enough for us.
    my $filename = substr(Digest::SHA::sha1_hex($combined), 0, 9) . ".css";

    path("/Library/WebServer/Documents/maestro/mockups/html/v3/cache/", $filename)->spew($combined);

    # FIXME: Hardcoded for the demo
    return qq{<link href="cache/$filename" rel="stylesheet">}
};


true;
