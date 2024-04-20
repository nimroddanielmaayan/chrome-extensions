chrome.runtime.onInstalled.addListener((details) => {
  // console.log(details);

  chrome.contextMenus.create({
    title: 'test context menu',
    id: 'contextMenu1',
    contexts: ['page', 'selection'],
  });

  chrome.contextMenus.onClicked.addListener((event) => {
    // console.log(event);

    // chrome.search.query({
    //   disposition: 'NEW_TAB',
    //   text: `imdb ${event.selectionText}`,
    // });

    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      console.log(tabs);
    });
  });
});

console.log('BG script running');
