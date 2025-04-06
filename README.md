# v1.0.0

**Hurls** short for historic urls is a **Firefox Extension** that was created so that it'd be easier to interact with the wayback CDX API, and with the purpose of using it in security research.

##### The user can create a wayback CDX API request with the following:
- Add the domain, by placing "domain.com" into the domain input, which basically adds "?url=domain.com/*" into the final url.

- Add a limit, by placing an integer like "50000", which is the default input, into the limit input, which basically adds "&limit=50000" into the final url. NOTE: The higher this is the more resources are required from your PC!

- Check the subdomain option, that will add "*." before the domain, which will make the CDX API pull results with subdomains aswell.

- Add a date from which point in time the results should be pulled from, by placing a year like "2020" and "2021" into the date inputs, which will basically just add "&from=2020&to=2021" into the final url. According to the CDX API documentation it's also possible to use regular timestamps aswell, however I have not tried that out myself.

- Add various filters available for the API such as, "mimetype" and "statuscode", which allow you to pull more specific type of urls from the CDX API, by pressing the "+ Filter" button and adding the filters such as "mimetype:application/json", which would basically add "&filter=mimetype:application/json" into the final url, allowing you to pull urls that use the corresponding mimetype form the CDX API. There are other filters available that can be read from the CDX API github page: `https://github.com/internetarchive/wayback/tree/master/wayback-cdx-server`

##### The results of the request will then be placed into a new tab, which allows you to check the results in various forms:
- You can get all the urls from the response, with no filters or anything placed, by pressing the "All Urls" button.

- You can get all the endpoints from the response, with some regex filters placed to remove trashy endpoints from the results, by pressing the "All Endpoints" button.

- You can get all the parameters from the response, with some regex filters placed to remove trashy parameters from the results, by pressing the "All Parameters" button. This differs from the endpoints in a way as you get all the parameters as single values like "query" rather than "?query=x&anotherparam=y" type of format.

## Installation

Currently the only installation option is to load the extension as a temporary addon, in firefox, though I've applied the extension for the firefox addon store, but I don't know how long it'll take until it's possible to install it from there.
This means that currently you'll need to load the extension everytime you start firefox, rather than it being "persistent". Thank mozilla for that one.

1. Use `git clone https://github.com/Antp1k/hurls.git` in your shell.

2. Press the extensions button and press "Manage extensions" option or browse to "about:addons".

3. From the settings button on the right of "Manage Your Extensions" title press "Debug Add-ons".

4. In the "about:debugigng#/runtime/this-firefox" tab, press "Load Temporary Add-on..." and select the manifest.json file from the extensions directory.
