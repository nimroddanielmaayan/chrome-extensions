console.log('hello from the content script');

const allATags = document.getElementsByTagName('a');

for (const tag of allATags) {
  tag.textContent = 'Gooooogle';
}
