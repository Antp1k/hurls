browser.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  if (request.type === "wayback") {
    try {
      let response = await fetch(request.val);
      let results  = await response.text();

      // Create a new tab for the results of the wayback response
      let tab = await browser.tabs.create({
        url: browser.extension.getURL("results.html")
      });

      setTimeout(() => {
          browser.tabs.sendMessage(tab.id, {data: results, statuscode: response.status});
      }, 700);
    } catch (e) {
      // Do nothing
    }
  }
});
