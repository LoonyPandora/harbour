package MaestroX::session;

use Dancer ":syntax";
use common::sense;


my @core_js = (
    "/core/js/jquery.js",           "/core/js/bootstrap.js",
    "/core/js/underscore.js",       "/core/js/backbone.js",
    "/core/js/hashgrid.js",         "/core/js/jquery.easy-pie-chart.js",
    "/core/js/backbone.cacheit.js", "/core/js/backbone.fetch-cache.js",
    "/core/js/moment.js",           "/core/js/maestro.js",
    "/core/js/maestro.config.js",   "/core/js/spin.js",
    "/core/js/jquery.spin.js",      "/core/js/jquery.transit.js",
    "/core/js/main.js",
);


# FIXME: Of course, this needs to be stored in a DB, and only load enabled perl modules
# Those enabled perl modules are done at an admin level during app startup.
my @enabled_modules = qw(session hosting);

my @core_css = (
    "/core/css/bootstrap.css",             "/core/css/font-awesome.css",
    "/core/css/bootstrap-custom.css",      "/core/css/hashgrid.css",
    "/core/css/jquery.easy-pie-chart.css", "/core/css/structure.css",
    "/core/css/header.css",                "/core/css/module-list.css",
    "/core/css/collection-list.css",       "/core/css/subnav.css",
    "/core/css/content.css",               "/core/css/form.css",
    "/core/css/utilities.css",             "/core/css/spinner.css",
    "/core/css/media-queries.css",         "/skins/default/css/default.css",
);





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

    set serializer => undef;
    return join "\n    ", @output;
};



true;
