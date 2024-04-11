const timeElement = document.getElementById('time');
const nameElement = document.getElementById('name');
const currentTime = new Date().toLocaleTimeString();
timeElement.textContent = `The time is: ${currentTime}`;

chrome.storage.sync.get(['userName'], (res) => {
  const userName = res.userName ?? '-';
  nameElement.textContent = `Your name is ${userName}`;
});
