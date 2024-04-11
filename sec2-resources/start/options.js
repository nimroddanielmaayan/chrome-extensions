console.log('hello from the options page');

const nameInput = document.getElementById('name-input');
const saveBtn = document.getElementById('save-btn');

saveBtn.addEventListener('click', () => {
  userName = nameInput.value;
  nameInput.value = '';
  chrome.storage.sync.set(
    {
      userName,
    },
    () => {
      console.log(`Name is set to ${userName}`);
    }
  );
});

chrome.storage.sync.get(['userName'], (res) => {
  nameInput.value = res.userName ?? '-';
  console.log(res);
});
