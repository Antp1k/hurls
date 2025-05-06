// Global variables for the search
let domain  = "example.org";
let limit   = "50000";
let from    = "";
let to      = "";

// Get domain as it's placed into the input
document.getElementById("waybackDomain").addEventListener('change', function(event) {
  domain = document.getElementById("waybackDomain").value;
});

// Get the result limit as it's placed into the input, but also throw error if it's NaN
document.getElementById("resultsLimit").addEventListener('change', function(event) {
  if (Number.isInteger(parseFloat(document.getElementById("resultsLimit").value))) {
    limit = document.getElementById("resultsLimit").value;
  } else {
    document.getElementById("errors").textContent = "Limit has to be an integer!";
  }
});

// Get the from and to inputs if they have been added
document.getElementById('from').addEventListener('change', function(event) {
  if (/\d{4}/.test(document.getElementById('from').value)) {
    from = document.getElementById('from').value;
  } else {
    document.getElementById('errors').textContent = "From has to be an integer in year format i.e: 2020!";
  }
});

// Do the same for "to"
document.getElementById('to').addEventListener('change', function(event) {
  if (/\d{4}/.test(document.getElementById('to').value)) {
    to = document.getElementById('to').value;
  } else {
    document.getElementById('errors').textContent = "To has to be an integer in year format i.e: 2021!";
  }
});

// As the "+Filter" button is pressed
// create an input where a filter can be typed out, 
// which will then be passed to the &filter= query parameter.
// Once that's done create a new "+Filter" button that'll do the same thing.
document.getElementById('newFilter').addEventListener('click',newFilter);
function newFilter() {
  const inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.className = 'filter';
  inputField.placeholder = 'mimetype:application/json etc.';

  const newButton = document.createElement('button');
  newButton.textContent = '+ Filter';

  const parent = event.target.parentElement;
  parent.replaceChild(inputField, event.target);
  parent.appendChild(newButton);
  newButton.addEventListener('click', newFilter);
}

document.getElementById('wayback').addEventListener('submit', function(event) {
  // Get the checkbox and set boolean
  const subdomains = document.getElementById('subdomains');
  const subs = subdomains.checked;

  // Get filters
  const filterElements = document.querySelectorAll('.filter');
  let filters = [];
  filterElements.forEach(element => {
    if (element.value !== "") {
      filters.push(element.value);
    }
  });

  // Start building the url
  let url = "";
  if (subs) {
    url = "https://web.archive.org/cdx/search/cdx?url=*." + domain + "/*&collapse=urlkey&fl=original&limit=" + limit;
  } else {
    url = "https://web.archive.org/cdx/search/cdx?url=" + domain + "/*&collapse=urlkey&fl=original&limit=" + limit;
  }

  // If from and to have values then add them into the url
  if (from !== "" && to !== "") {
    url += "&from=" + from + "&to=" + to;
  }

  // Add all filters into the url aswell
  for (filter in filters) {
    url += "&filter=" + filters[filter];
  } 

  chrome.runtime.sendMessage({type: "wayback", val: url}, function(response) {
    // Do nothing
  });
});
