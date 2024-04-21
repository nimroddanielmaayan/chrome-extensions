# React & TypeScript Chrome Extension Development Course

- Course link: https://www.udemy.com/course/chrome-extension

## Section 1: (no notes)

## Section 2: Chrome Extension Basics

### General

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

- We have 3 main environments\JS scripts when developing a Chrome extension:
  - Popup
  - Options page
  - Service Worker

### Options Page

- The `manifest.json` has to point to the options page's HTML file

- The options page by default opens in a new tab

### Data and the Chrome Storage API

- It's usually best to use `chrome.storage.sync.set` and
  `chrome.storage.sync.get`, and not the "unsyched" version of these functions,
  in order to persist data across devices.

- The only way to wipe clean the extension's memory (for development purposes),
  is by removing and re-adding the extension

### Background Scripts and Service Workers

- The thing about our JS scripts so far (`options.js` and `popup.js`), is that
  they run only when the extension is open\running. There are things that should
  work in the background all the time, like timers. For that, we have BG scripts
  which always run while the extension is installed

- A BG script is esentially a service worker, which scan be idle ("asleep") or
  active. It has it's own `this`\global object, which is called
  "serviceWorkerGlobalScope". It's different from the browser's "window" global
  object

- Service workers will automatically "idle out" after a few seconds if they
  don't get any calls to do work

- The chrome.alarms API allows us to override this "idle out" behavior. It needs
  to be added as a permission in `manifest.json`

- We can create one default alarm or several named alarms. Each alarm will fire
  events that we can listen for

### Crome Notifications API

- The way notifications are done since mavifest version 3 is using
  ServiceWorkerRegistration.showNotification. We need to add "notifications" to
  `manifest.json` in order to use it

- If we'll look inside the service worker JS script's global object, we'll find
  ServiceWorkerRegistration inside it. So the syntax is going to be
  `this.registration.everythingElse`

## Section 3: (project section, skipped for now)

## Section 4: Data Fetching and More Chrome APIs

### Chrome Runtime API

- The Chrome Runtime API can return a lot of information about the extension
  (like getManifest), and also allows us to listen to important events (like
  onStartup)

- The onInstalled method is very useful - for example, we can use it to set
  default values to all variables when the extenstion is installed

### Chrome Context Menu API

- This allows us to alter the context menus that the user gets when
  right-clicking in Chrome. It's a very powerful feature!

- We can use the returned context menu `event` to get access to important things
  in an interaction event, like the text that the user highlighted before
  clicking

- It's possible to create sub-menus for context menus

### Chrome Search API

- This API allows us to create a custom search

- The `manifest.json` permission it requires is "search" (and usually also
  "tabs", because they are needed for displaying the search)

- Allows us to create custom web searches

### Chrome Tabs API

- The `manifest.json` permission it requires is "tabs"

- This API allows us to do things with the currently active tabs, like
  requesting information about them (as "tab objects") or creating new, custom
  tabs

- Some to request information, we have the method `chrome.tabs.query` and for
  creating new tabs we have the method `chrome.tabs.create`

### Content Scripts

- Content scripts are yet another environment that exists in Chrome extensions.
  It's an "isolated world" that runs independently from a wep page

- Content scripts are our main way of interacting with web pages. They can apply
  to all web pages or only to specific ones

- Content scripts can manipulate web pages, either statically, dynamically or
  programatically. Examples of things they can do: Change text, change the
  design, add HTML elements, etc.

-
