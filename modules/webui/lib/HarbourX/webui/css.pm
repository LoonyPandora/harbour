package HarbourX::webui::css;

use Dancer ":syntax";
use Path::Tiny qw(path);

use common::sense;


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



get "/webui/css.html" => sub {
    my @output;
    for my $css (@core_css) {
        push @output, qq{<link href="$css" rel="stylesheet">};
    }

    my $enabled_modules = HarbourX::session::modules::enabled_modules();

    # So we can check if the file exists so we can include it
    my $publicdir = path(dirname(__FILE__), "../../../../");

    for my $module (@$enabled_modules) {
        if ($publicdir->child($module, "public", "css", "$module.css")->is_file) {
            push @output, qq{<link href="/modules/$module/css/$module.css" rel="stylesheet">};
        }
    }

    set serializer => undef;
    return join "\n    ", @output;
};

1;