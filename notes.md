# React & TypeScript Chrome Extension Development Course

- Link: https://www.udemy.com/course/chrome-extension

## Chrome Extension Basics

- Every Chrome extention needs to have a `manifest.json` file

- Most extensions need access to one or more Chrome Extensions APIs. An
  Extensions API consists of a namespace containing methods and properties for
  doing extensions work, and usually, but not always, manifest fields for the
  `manifest.json` file

- In order to develop and test extensions, we can use the `development mode` in
  chrome://extensions

- It's only neccessary to reload our extension if we changed the `manifest.json`
  file, or if we want to do a fresh reload for testing purposes

- It's possible to interact with an extension's HTML using the Chrome Dev Tools,
  just like when interacting with any regular web page.

### Options Page

- The `manifest.json` has to point to the options page's HTML file

- The options page by default opens in a new tab

### Data and the Chrome Storage API

- It's usually best to use `chrome.storage.sync.set` and
  `chrome.storage.sync.get`, and not the "unsyched" version of these functions,
  in order to persist data across devices.

-
