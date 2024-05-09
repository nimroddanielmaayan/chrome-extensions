# React & TypeScript Chrome Extension Development Course

- Course link: https://www.udemy.com/course/chrome-extension

## Section 1: Intro

### General

- This section is very short and contains basic course info

## Section 2: Chrome Extension Basics

### General

- Every Chrome extention needs to have a `manifest.json` file

- Most extensions need access to one or more Chrome Extensions APIs. An
  Extensions API consists of a namespace containing methods and properties for
  doing extensions work, and usually, but not always, manifest fields for the
  `manifest.json` file

- In order to develop and test extensions, we can use the `development mode` in
  chrome://extensions

- It's only necessary to reload our extension if we changed the `manifest.json`
  file, or if we want to do a fresh reload for testing purposes

- It's possible to interact with an extension's HTML using the Chrome Dev Tools,
  just like when interacting with any regular web page.

- We have 4 main environments\JS scripts when developing a Chrome extension:

  - Extension's Popup
  - Extension's Options Page
  - Background Script ("background service worker")
  - Content Script\s ("independent island\s")

- Note: When checking errors in the extension developer console, sometimes we
  need to click "clear all" in order to remove the errors from the console.
  Otherwise they will stay there even after they are fixed

### Options Page

- The `manifest.json` has to point to the options page's HTML file

- The options page by default opens in a new tab

### Data and the Chrome Storage API

- Chrome has a built-in data storage system, which can either be synched or
  unsynched

- It's usually best to use `chrome.storage.sync.set` and
  `chrome.storage.sync.get`, and not the "unsyched" version of these functions,
  in order to persist data across devices. Though sometimes it might make more
  sense not to synch, depending on the use case

- The only way to wipe clean the extension's memory (for development purposes),
  is by removing and re-adding the extension

- It's also possible to use third-party state management libraries in chrome
  extensions, such as `Redux` or `Zustand`

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

### Chrome Notifications API

- The way notifications are done since mavifest version 3 is using
  ServiceWorkerRegistration.showNotification. We need to add "notifications" to
  `manifest.json` in order to use it

- If we'll look inside the service worker JS script's global object, we'll find
  ServiceWorkerRegistration inside it. So the syntax is going to be
  `this.registration.everythingElse`

## Section 3: (project section)

### Genetal

- This project is very simple and it's built with vanilla JS\vanilla CSS.
  There's no real need to go over it unless I'll want to refresh my memory, in
  the future

## Section 4: Data Fetching and More Chrome APIs

### Chrome Runtime API

- The Chrome Runtime API can return a lot of information about the extension
  (like getManifest), and also allows us to listen to important events (like
  onStartup)

- The onInstalled method is very useful - for example, we can use it to set
  default values to all variables when the extenstion is installed. It's
  actually very much recommended to set default values for all of the data that
  the extension might need using onInstalled, in order to avoid bugs and errors
  that may happen due to crucial data not being available at all

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

### Message Passing (between scripts)

- It's necessary for all our scripts to "talk" to each other. For example, when
  the content script changes the text of a web page we might want the background
  script to know that, and to store the updated text for it's own uses

- For this we have the sendMessage API

- These messages can then be listened to in any script, using the addListener
  method

- It's possible to only listen to certain messages and not to all of them, if
  that makes more sense

### Data Fetching and HTTP Requests

- HTTP requests like `GET` can be used to get data from an API. one way of doing
  this is using the `fetch()` method. We will usually combine such a `GET`
  request with an async function in order to store the data locally inside the
  Chrome storage once it arrives from the API, before actually using it in the
  extension

- In many cases, one JS script will requst the data from an API and another JS
  script will use it

### Text to Speech API

- The chrome.tts method is a native and simple text-to-speech method that
  enables chrome to read out any text

- It's possible to control some TTS parameters like the rate of speech, the
  language, etc

## Section 5: TS, React and Webpack

### General

- It's usually recommended to develop Chrome extensions using React and TS,
  since they are very well established in the existing Chrome extension
  ecosystem. It's much easier and better to use them than to use vanilla JS

- The most recommended build tool for Chrome extensions is Webpack. We need it
  in order to turn a complex development environment into simpler, static
  production\build code. This is especially true if we're using React and
  TypeScript

- The syntax of the webpack.config.js file is "standard" JS syntax

- The course shows a "basic" possible configuration for Webpack (on this
  section - section 5). I can use it for my first extension projects, and I can
  get deeper into Webpack configurations later if I have to

- It's neccesary to use a build tool like Webpack for Chrome plugins because
  they can't directly "understand" React or TS, only regular JS. So compiling to
  JS is necessary (just like when using React and TS in any other type of
  project)

- Webpack can be set to "development mode", in which it will perform hot reloads
  and update the build folder whenever any change is made to the source code

### Webpack Plugins

- Webpack plugins do the things that modules can't do

- One plugin that we need is CopyPlugin, for copying the `manifest.json` into
  the build folder

- Another useful plugin is HtmlPlugin which instructs Webpack to create
  different HTML output files as `chunks` (which is a Webpack concept)

### Webpack CSS Loaders

- I can use the basic CSS loaders configuration from this course in my first
  projects

- Note: It's not necessary to write a utility function like getHtmlPlugins(),
  it's just fine to use regular class

- For CSS, Webpack needs the plugins StyleLoader and CssLoader

- Note: Webpack bundles the CSS files from the source code directly into the
  final JS files, not into new CSS files. Maybe the final code is more efficient
  this way

### Types Definition Libraries

- To use TS for Chrome development we need a types library that has types for
  chrome code. One such library is DefinitelyTyped, but there are others as well

- TS can help us catch errors on time, get autocomplete, etc

### Webpack Production Mode

- When Webpack is in production mode, it won't only bundle the code but also
  minify and treeshake it. When actually publishing extensions we obviously need
  to optimize their size first

- All the other definitions remain the same between modes

- It's ok to leave this phase for the end of an extension project. All the
  development and testing can be done in development mode

- To use production mode, instead of one Webpack definitions file named
  `webpack.config.js` we'll need several things:

  - `webpack.common.js` (will include all files previously in
    `webpack.config.js`)
  - `webpack.dev.js`
  - `webpack.prod.js`
  - A module called `webpack-merge`
  - A build script in `package.json` that calls `webpack.prod.js`

- If we want to "clean" the build folder of all the old files any time we do a
  new build (by default, existing files will be overwritten but not deleted), we
  need a library called clean-webpack-plugin

### Webpack Boilerplate

- In this lesson (number 45), there's an explanation to the boilerplate which is
  included in the course resources. In the Q&A section of this lesson there are
  a few updates about boilerplates for additional setups including TailwindCSS

- There's also a readme.md file with step-by-step instructions (although they
  might not be 100% up to date...)

- If the boilerplate won't work when I'll need it, I can try to send a question
  to the course author

## Section 6: Weather Extension Project

### General

- The project is an extension that contacts an API and retrievs weather data. It
  has several basic features like:

  - Storing the current city and other favorite cities
  - Selecting text and retrieving the weather written in that text (or returning
    an error if invalid)
  - Injecting a floating frame with the weather into the current webpage

- It has only a front end (no back end), and the FE stack is: React, Material
  UI, TS

- The project uses basic React, TS and MUI, nothing too complex

- It has a refresher for the Chrome storage API as well (lessons 55 + 56)

## Section 7: Project Section (skipped for now, complete this later)

## Section 8: Chrome Web Store Publishing

### General

- It's recommended to use my "development" account for registering to the Chrome
  Web Store as a developer, not my personal or business accounts

- It's important for anyone who has anything to do with developing Chrome
  extensions to know Google's policies concerning guidelines, privacy, quality
  and everything else

- According to Google's guidelines every extention should have `one` single,
  clear purpose. If someone wants to develop several different functionalities,
  he should develop several different extensions

- The submission process requires complying with Google's requirements and
  submitting all of the information that they want

- Extension analytics:
  - There are a lot of statistics in the default dashboard
  - It's possible to also add Google Analytics in order to further track the
    extension

## Section 9: Chrome Extension themes

### General

- Chrome themes are similar to extensions but they are easier and simpler to
  create. They are basically just made of a `manifest.json` and image files

- There's extensive documentation in Google's developer docs, if I ever need
  them

## Section 10 (not part of the course): Personal Project

### General Idea and Workplan

- My idea for a practice project is a simple AI extension which sums up any
  length of text to 20 words or less. It will use ChatGPT's API, or any other AI
  API that's available and can do the job well

- The texts will be saved to the back end (just for practicing Firebase as a
  back end for Chrome extensions). Also, there will be an option to log in using
  Google, and other Firebase features (not really needed, but just for practice)

- Maybe also add a connection to a news API, and enable loading a 20-word
  summary of a random news story from today

- The extension will be reachable by marking any text and then right clicking

- FE stack: React, Tailwind CSS, TS

- BE stack: Google Firebase
