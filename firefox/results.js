// Array that's going to be filled with wayback urls
let urls = [];
let endpoints = [];
let parameters = [];

// Wait for data from background.js and set the data into a global array
browser.runtime.onMessage.addListener((message) => {
  if (message.data !== "" && message.statuscode === 200) {
    // Place each url from message.data into urls array
    message.data.split(/\r?\n/).forEach(url => {
      if (!urls.includes(url)) {
        urls.push(url);
      }
    });

    // Place endpoints from urls to endpoints array
    urls.forEach(url => {
      try {
        u = new URL(url); 
        if (!/[\[\]\?:%@]/.test(u.pathname) && /^\/[a-zA-Z0-9\._]/.test(u.pathname) && !endpoints.includes(u.pathname)) {
          endpoints.push(u.pathname);
        }
      } catch (e) {
        // Do nothing  
      }
    });

    // Place parameters from urls to parameters array
    urls.forEach(url => {
      try {
        u = new URL(url); 
        u.searchParams.forEach((value, key) => {
          if (value !== "" && /^[a-zA-Z0-9\-_\.\$]+$/.test(key) && !parameters.includes(key)){
            parameters.push(key);
          }
        });
      } catch (e) {
        // Do nothing 
      }
    });
    allEndpoints();
  } else {
    document.getElementById("results").textContent = "Wayback CDX API had an issue, either it's unavailable or being slow, try again, but if there's still no results wait for a good while for the server to return!";
  }
});

document.getElementById("allUrls").addEventListener("click",allUrls);
document.getElementById("allEndpoints").addEventListener("click", allEndpoints);
document.getElementById("allParameters").addEventListener("click", allParameters);

function allUrls() {
  document.getElementById("found").textContent = "Found: " + urls.length.toString() + " urls!";
  let res = "";
  urls.forEach(url => {
    res += url + "\n";
  });
  document.getElementById("results").textContent = res;
}

function allEndpoints() {
  document.getElementById("found").textContent = "Found: " + endpoints.length.toString() + " endpoints!";
  let res = "";
  endpoints.forEach(ep => {
    res += ep + "\n";
  });
  document.getElementById("results").textContent = res;
}

function allParameters() {
  document.getElementById("found").textContent = "Found: " + parameters.length.toString() + " parameters!";
  let res = "";
  parameters.forEach(param => {
    res += param + "\n";
  });
  document.getElementById("results").textContent = res;
}
