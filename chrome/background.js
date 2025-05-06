chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  if (request.type === "wayback") {
    try {
      let response = await fetch(request.val);
      let results  = await response.text();

      // Create a new tab for the results of the wayback response
      let tab = await chrome.tabs.create({
        url: chrome.runtime.getURL("results.html")
      });

      setTimeout(() => {
          chrome.tabs.sendMessage(tab.id, {data: results, statuscode: response.status});
      }, 700);
    } catch (e) {
      // Do nothing
    }
    return false;
  }
});
