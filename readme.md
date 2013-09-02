Harbour
=======

Infrastructure as a service, powered by a docker backend.

Focusing on a great, simple to use GUI rather than in-depth features. This is software for the 90% use case. Power users will use the command line tools most of the time anyway. To convert these kind of people would be tough. We make software they will use for the day-to-day operations, dropping down to the command line when they want to do something complex. The average sysadmin will use the GUI all the time, and not need the advanced features.

Gradually we will add more features as they mature and the interface is perfected.

This will help us defeat our competitors who come from hardcore engineering backgrounds and add features at breakneck speed. We get in on the mass-adoption side of the things, and piggy back on the technical advances of others.


- Group together multiple docker containers as a "shipment"
    - Manage these groups as a single entity
    - Useful for grouping sets of software together e.g Web Server, DB Server, Cache Server, etc




Business
--------

App structure should be open source, as should some modules. We will make money off the non-open modules that do most of the heavy lifting.

We do after all want to provide a service to the community, and we can best do that by providing a great GUI for a great product in docker.




Target Audience
---------------

For the hosted product, we are targetting geeks & hobbyists for the beta, small startups and side-projects for the paid-for final product.

Downloadable software is targetted at businesses to manage their internal infrastructures. Mainly web development shops - the sort that are most likely to use new software



Competitors
-----------

[Flynn.io](https://flynn.io)
[Ansible Works](http://www.ansibleworks.com)
[Canonical Landscape](https://landscape.canonical.com)
[Docker Maestro](https://github.com/toscanini/maestro)
[Docker UI](https://github.com/crosbymichael/dockerui)
[CTL-C](http://ctl-c.io)
[Commando](https://commando.io)
[Hosted Chef](http://www.opscode.com/enterprise-chef/)
[Hosted Puppet](https://www.hostedpuppetmaster.com)
[The Foreman](http://theforeman.org)


THE PLAN
--------


1) Build hosted "beta" version of app that ONLY manages single docker containers
This will allow us to launch, get feedback and hyped.

2) Build deployment infrastructure, allowing us to build distributable app and single docker container management interface
This will allow us to take a LOT of the momentum away from Docker UI

3) Continue to work on modules that allow grouping of docker containers and management for the hosted product
Work out a pricing structure and work around security concerns (see how competitors handle the idea of giving root to a 3rd party...)












