console.log('service worker');
console.log(this);

let time1 = 0;

setInterval(() => {
  time1 += 1;
  console.log(time1);
}, 1000);

chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(['timer'], (res) => {
    const time2 = res.timer ?? 0;
    chrome.storage.local.set({
      timer: time2 + 1,
    });
    chrome.action.setBadgeText({
      text: `${time2 + 1}`,
    });
  });
});
