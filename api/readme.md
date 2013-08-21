API
===

Perl API code for Harbour. Contains all the API code we write.

There shouldn't be too much in here, it's got to be pretty lightweight. Most of the heavy lifting will be done by the 3rd party / optional modules.


Structure
---------

```
/lib                        # Library code written by us

/migration                  # SQL migrations between DB versions

/t                          # Tests. Lots of tests

/vendor
    /perlbrew               # Our custom-built version of perl, for easy maintenance and uninstallation
```
