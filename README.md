# Blind friendly lib
Web accessibility for people with disabilities

### Description
Annotation to the year's work:

The goal of my year-long thesis is to create a website that is user-friendly and accessible for the visually impaired and has features that are indispensable for these visitors. All of these created features will then be implemented on our group project (Digital Textbook System) from last year. Such features include:

TTS (text to speech), or pre-reading of web content, i.e. textbooks. The feature will have the ability to pause the readout and the ability to choose where to start reading the text from.
In addition, the entire site needs to be customized to be easy to navigate using the keyboard. This is so that if the user gets to a link, button or image etc..., there will be an option to turn on a voice navigator to tell the user what element they are currently on and what it means.
A mode with sufficient contrast of colors and textures.
The impact of implementing accessibility features in the web and a library with extra features

This year's work focuses on the implementation of accessibility elements into the web, proper UI/UX planning and their subsequent impact on the spectrum of web users - that is, users who need the elements and users who may use them unconditionally. It therefore consists of two complementary parts:

- Implementation of accessibility features
These features are mostly the W3C WAI standard. These include, for example, alternative image captions (alt), keyboard controls, audio transcription, or color modes. The goal is to connect with an organization that includes, for example, visually impaired people and use their additional suggestions based on feedback.

- A library with superior features
Additional features that are not among the standard ones, but can be particularly beneficial for ordinary users and can also be implemented in general - independently of the web, the aim is to group them into a library. This library would then provide these functions with instructions on how to use them. Examples of these features include TTS (Text To Speech) or voice control.

- [demo](https://bfl-t6ps.onrender.com/)

### Table of Contents
- [Blind friendly lib](#blind-friendly-lib)
    - [Description](#description)
    - [Table of Contents](#table-of-contents)
    - [Technologies Used](#technologies-used)
    - [Instalition and Usage](#instalition-and-usage)
    - [Project Setup](#project-setup)

### Technologies Used
- JS
- NODE.JS
***
### Instalition and Usage
- install library

```sh
npm i blind-friendly-library
```
- This library needs to be imported into the main.js file in the project, specifically importing the *speaker.js* file (`setBFL()` function).

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