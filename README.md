# Blind friendly lib
Web accessibility for people with disabilities

- [demo](https://bfl-t6ps.onrender.com/)

### Table of Contents
- [Blind friendly lib](#blind-friendly-lib)
    - [Table of Contents](#table-of-contents)
    - [Technologies Used](#technologies-used)
    - [Instalition and Usage](#instalition-and-usage)
    - [Project Setup](#project-setup)
    - [Configure library](#configure-library)

### Technologies Used
- JS
- NODE.JS
***
### Instalition and Usage
- install library

```sh
npm i blind-friendly-library
```
- This library needs to be imported into the main.js file in the project, specifically importing the *index.js* file (`setBFL()` function).

```js
import { setBFL } from '../../lib/index.js';
```
- Then run the `setBFL()` function and insert the parameters you have chosen to set the speaker's voice.

```js
setBFL(1,1,1.2,"en"); //(volume,rate,pitch,lang)
```
***
### Project Setup
- The project has three main functions TTS (text to speech), SF (speech focus) and VC (voice control).
  
**1. SF (speech focus)**
  - Speech focus works by itself right after installing the library.
  - Switched on with the **CTRL+SHIFT+1** key.
  - Switch between elements via the `TAB` key.

**2. TTS (text to speech)**
  - Text to speech works using custom `data-speaker` attributes. These are added to the elements to be read.
  
```html
<p data-speaker>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
```
  - Text to speech is activated using the **CTRL+SHIFT+2** key.
  - Use the **arrows** `(<-,->)` to move between elements.

**3. VC (voice control)**
  - This function works by using custom attributes `data-el-text`, which are loaded when this function is run and then searches them to see if what the user said is in them. The value of the custom attribute specifies the name by which the element can be found.

  ```html
  <a data-el-text="Home">HOME</a>
  ```
  ```html
  <a data-el-text="Home" data-el-text-en="Home" data-el-text-cs="Domů">HOME</a>
  ```
  - You can add the action, which will be performed. (default = click())
   ```html
  <a data-el-text="Home" data-el-action="click">HOME</a>
  ```
  - Speech to text is enabled using the **CTRL+SHIFT+3** key and then the user enters what is to be done.
**4. Manual**
  - Press **CTRL+SHIFT+4** to turn on the guide.

***
### Configure library

**Keyboard shortCuts change**
  - You can also use the function to override keys to trigger functions in main.js
  ```js
  const myKey = {
    kscFocus: 'event.key === "1"',
    kscSpeaker: 'event.key === "2"',
    kscVoiceControl: 'event.key === "3"',
    kscManual: 'event.key === "4"',
  };
  setBFL(1, 1, 1.2, "en");
  setKeyBFL(myKey); 
  ```
**Importing Speaker functions**
- Functions to make for example GUI for your Speaker, or just start Speaker from Button.
  ```js
  import * as BFL from "blind-friendly-library/src/lib/index.js";

  BFL.startGlobalSpeaker();

  BFL.setSpeedOfSpeaker(newValue);
  BFL.pauseButton();
  BFL.stopSpeaker();
  BFL.previousArticle();
  BFL.nextArticle();

  BFL.hasPrevious();
  BFL.hasNext();
  BFL.isPauseBfl();

  this.isGlobalSpeakerStarted = false;
  ```
- Voice control function for adding a new command
  ```js
  BFL.addCommand('new commad', () => { console.log('This is a new command!'); });
  ```