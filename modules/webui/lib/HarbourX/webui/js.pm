package HarbourX::webui::js;

use Dancer ":syntax";
use Path::Tiny qw(path);

use common::sense;


my @core_js = (
    # Load pace early
    "/core/js/pace.js",

    "/core/js/jquery.js",           "/core/js/bootstrap.js",
    "/core/js/underscore.js",       "/core/js/backbone.js",
    
    "/core/js/hashgrid.js",         "/core/js/highlight.js",
    "/core/js/backbone.cacheit.js", "/core/js/markdown.js",
    "/core/js/moment.js",           "/core/js/spin.js",
    "/core/js/jquery.spin.js",      "/core/js/jquery.transit.js",

    # Our stuff
    "/core/js/harbour.js",  "/core/js/harbour.config.js", "/core/js/main.js",
);


# HTML output because nginx is purposefully dumb
# FIXME: Write a proper serializer here instead of hardcoding
get "/webui/js.html" => sub {
    my @output;
    for my $core (@core_js) {
        push @output, qq{<script src="$core"></script>};
    }

    my $enabled_modules = HarbourX::session::modules::enabled_modules();

    # So we can check if the file exists so we can include it
    my $publicdir = path(dirname(__FILE__), "../../../../");

    for my $module (@$enabled_modules) {
        for my $type (qw(router model collection view mixin)) {
            if ($publicdir->child($module, "public", "js", "$module.$type.js")->is_file) {
                push @output, qq{<script src="/modules/$module/js/$module.$type.js"></script>}
            }
        }
    }

    set serializer => undef;
    return join "\n", @output;
};

1;