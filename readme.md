Bellerophon
===========


Goal
----

To provide a modern and lightweight alternative to web hosting control panels like cPanel and Webmin.


Rationale
---------

Control panel software is clunky, confusing, and stuck in the 90's in terms of user interface. We can change that.

cPanel is the defacto choice. It has no competitors in 2013. It's also horrible for end users and developers alike. It's the incumbent and the industry is ripe for disruption.


Target Audience
---------------

Small to mid-size hosting companies and resellers.

The huge players (linode, rackspace, etc) have their own control panel software. The mid-size players may have their own cobbled together software that sucks harder than cPanel. The smallest players have cPanel - maybe skinning it to look less retina-burning.

If we present the small players a cheaper alternative to cPanel that looks like it belongs in the 21st century, they'll switch. If we provide a sane API for the mid-size players to integrate with, they'll switch.


We should dogfood the application and have a hosting side-business that runs the control panel. This allows us to make a better product because we actually use it - and shows prospective clients a real live system they can sign-up and use at their lesuire.


Why Now?
--------

cPanel started in an age when Apache 1.0 & Windows 95 were the new hotness. Of course it has grown and changed since then - but the idea behind it has not. The hosting industry is moving in a direction that cPanel cannot follow because of its legacy requirements. We don't have that baggage.

An interface that works on the web, tablet, and mobile. A sane restful API for getting things done. Open and Free module development. cPanel is too big and ponderous to fill these niches. We can take the low end from them with an MVP. As we grow, we start fighting them on the high end.


Key Points
----------

 - HTML5 & backbone.js front-end
 - Node.js & MariaDB back-end (Backend should be just a spec - it doesn't matter, it's ALL about the GUI)
 - Module/Plugin repository open & free on GitHub (like OS X homebrew formulae)



Minimum Viable Product
----------------------

Traditional shared hosting is dead. Don't bother with it. Everything is a VPS. This keeps resource management easy - that's what the hypervisor does.

Modern Shared hosting is HTML-only static hosting. Marketing can suggesting running client-side applications that work on mobile and tablet. A dedicated box with nginx can run literally thousands of HTML-only websites. We can sell this for 99p a month, undercutting everyone. This would be perfect in conjunction with a sitebuilder like moonfruit / basekit / free templates that spits out static HTML.

If someone wants shared hosting with an app like wordpress - Give them a very limited VPS (128/256Mb RAM should be enough for wordpress + nginx + MariaDB) - Treat this as an upsell. Each app is ~99p a month. That gives us between 200-500 clients on a 64Gb VM tank. This is comparable to old fashioned shared hosting numbers, with better performance and stability.

We also sell actual real VPS stuff. This is just an extension of the shared hosting stuff.

We do NOT do dedicated servers, SSL certificates, domain registration, DNS management

We Do:

 - Shared Static Hosting (subset of VPS) - Cheapest
 - Shared App Hosting (subset of VPS) - Cheap
 - VPS Hosting - Regular Price

