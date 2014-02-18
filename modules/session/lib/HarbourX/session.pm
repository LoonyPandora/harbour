package HarbourX::session;

use Dancer ":syntax";
use common::sense;


my @core_js = (
    "/core/js/pace.js",
    "/core/js/jquery.js",           "/core/js/bootstrap.js",
    "/core/js/underscore.js",       "/core/js/backbone.js",
    "/core/js/harbour.config.js",
    "/core/js/hashgrid.js",         "/core/js/highlight.js",
    "/core/js/backbone.cacheit.js", "/core/js/markdown.js",
    "/core/js/moment.js",           "/core/js/harbour.js",
    "/core/js/spin.js",
    "/core/js/jquery.spin.js",      "/core/js/jquery.transit.js",
    "/core/js/main.js",
);


# FIXME: Of course, this needs to be stored in a DB, and only load enabled perl modules
# Those enabled perl modules are done at an admin level during app startup.
my @enabled_modules = qw(session NotJenkins);

my @core_css = (
    "/core/css/pace-themes/pace-theme-minimal.css",
    "/core/css/bootstrap.css",             "/core/css/font-awesome.css",
    "/core/css/bootstrap-custom.css",      "/core/css/hashgrid.css",
    "/core/css/structure.css",
    "/core/css/header.css",                "/core/css/module-list.css",
    "/core/css/collection-list.css",       "/core/css/subnav.css",
    "/core/css/content.css",               "/core/css/form.css",
    "/core/css/utilities.css",             "/core/css/spinner.css",
    "/core/css/media-queries.css",         "/skins/default/css/default.css",
);




get "/session/modules" => sub {
    return \@enabled_modules;
};




# HTML output because nginx is purposefully dumb
# FIXME: Write a proper serializer here instead of hardcoding
get "/session/js.html" => sub {
    my @output;
    for my $core (@core_js) {
        push @output, qq{
            <script src="$core"></script>
        };
    }

    for my $module (@enabled_modules) {
        push @output, qq{
            <script src="/modules/$module/js/$module.router.js"></script>
            <script src="/modules/$module/js/$module.model.js"></script>
            <script src="/modules/$module/js/$module.collection.js"></script>
            <script src="/modules/$module/js/$module.view.js"></script>
            <script src="/modules/$module/js/$module.mixin.js"></script>
        };
    }

    set serializer => undef;
    return join "\n", @output;
};


get "/session/css.html" => sub {
    my @output;
    for my $css (@core_css) {
        push @output, qq{<link href="$css" rel="stylesheet">};
    }

    for my $module (@enabled_modules) {
        push @output, qq{
            <link href="/modules/$module/css/$module.css" rel="stylesheet">
        };
    }

    set serializer => undef;
    return join "\n    ", @output;
};



true;
