GUI
===

The bread and butter of this project. Web app in HTML5 and backbone.js.


Structure
---------

```
/core                   # Lightweight core, should be just enough to bootstrap the loading of modules

/modules                # Module directory. Individual modules are downloaded and installed here
    /home               # Module name
        /perl           # Any perl code needed for this module. Should be a dancer route, maybe some lib files. added to @INC
        /public         # HTML/CSS/JS for this module. Will not be served directly form this dir, but will be copied + minified.

/public                 # Global public diretory. Everything in here is served by nginx
    /rev-af35948        # SHA of compiled assets. Done for cachebusting reasons.

/themes                 # Theme directory. These are lighweight skins for branding purposes.
    /default            # Default theme, contains HTML + CSS + Fonts + Images - No JS. Will be copied into global public

/vendor                 # 3rd party front-end libraries. jQuery / Bootstrap / Moment / etc. Each in a dir by version

```
