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



Amazon Hardware
---------------

EC2 Compute Unit (ECU) – One EC2 Compute Unit (ECU) provides the equivalent CPU capacity of a 1.0-1.2 GHz 2007 Opteron or 2007 Xeon processor


Micro Instance
613 MiB of memory, up to 2 ECUs (for short periodic bursts), EBS storage only, 32-bit or 64-bit platform

M1 Small Instance (Default)
1.7 GiB of memory, 1 EC2 Compute Unit (1 virtual core with 1 EC2 Compute Unit), 160 GB of local instance storage, 32-bit or 64-bit platform

M1 Medium Instance
3.75 GiB of memory, 2 EC2 Compute Units (1 virtual core with 2 EC2 Compute Units each), 410 GB of local instance storage, 32-bit or 64-bit platform

M1 Large Instance
7.5 GiB of memory, 4 EC2 Compute Units (2 virtual cores with 2 EC2 Compute Units each), 850 GB of local instance storage, 64-bit platform

M1 Extra Large Instance
15 GiB of memory, 8 EC2 Compute Units (4 virtual cores with 2 EC2 Compute Units each), 1690 GB of local instance storage, 64-bit platform


Amazon Pricing
--------------

Amazon EBS Standard volumes
$0.11 per GB-month of provisioned storage
$0.11 per 1 million I/O requests

Amazon EBS Provisioned IOPS volumes
$0.138 per GB-month of provisioned storage
$0.11 per provisioned IOPS-month

Data Transfer OUT From Amazon EC2 To Internet
First 1 GB / month  $0.000 per GB
Up to 10 TB / month $0.120 per GB


Standard On-Demand Instances
Micro           $0.020 per Hour
Small (Default) $0.065 per Hour
Medium          $0.130 per Hour
Large           $0.260 per Hour
Extra Large     $0.520 per Hour


Light Utilization Reserved Instances
Micro           $23     $0.015 per Hour
Small (Default) $61     $0.042 per Hour
Medium          $122    $0.085 per Hour
Large           $243    $0.170 per Hour
Extra Large     $486    $0.339 per Hour



My Costs
--------

Fixed Costs:
OS image: $0.50


Micro (cheapest possible):

$0.11  per million IO reqs
$0.11  per GB storage
$0.120 per GB data transfer
$0.015 per Hour

20 customers per server

1GB Storage per customer
1GB Transfer per customer

$10.95 for uptime
$2.20  for IO requests
$2.20  for storage
$2.40  for bandwith

$17.75 month
£11.40 month

£1 per month
£20 per month gross
£8.60 profit month

43% profit


Small:

$0.11  per million IO reqs
$0.11  per GB storage
$0.120 per GB data transfer
$0.042 per Hour

60 customers per server

1GB Storage per customer
1GB Transfer per customer


$30.66 for uptime
$6.60  for IO
$6.60  for storage
$7.20  for bandwidth

$51.06 month
£32.81 month

£1 per month price
£60 per month gross
£27.19 profit

45% profit margin




