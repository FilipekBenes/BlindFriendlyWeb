<template>
  <div id="home">
    <div class="hero">
      <div>
        <h1>BFL - Blind friendly library</h1>
      </div>
    </div>
    <section class="section_aboutUs">
      <div>
        <h1 data-speaker>About library</h1>
        <p>Web accessibility for people with disabilities</p>
        <p data-speaker>The goal of my year-long thesis is to create a website that is user-friendly and accessible for the visually impaired and has features that are indispensable for these
          visitors.
          All of
          these created features will then be implemented on our group project (Digital Textbook System) from last year. Such features include:
          TTS (text to speech), or pre-reading of web content, i.e. textbooks. The feature will have the ability to pause the readout and the ability to choose where to start reading the text from.
          In addition, the entire site needs to be customized to be easy to navigate using the keyboard. This is so that if the user gets to a link, button or image etc..., there will be an option to
          turn on a voice navigator to tell the user what element they are currently on and what it means.
          A mode with sufficient contrast of colors and textures.
          The impact of implementing accessibility features in the web and a library with extra features
          This year's work focuses on the implementation of accessibility elements into the web, proper UI/UX planning and their subsequent impact on the spectrum of web users - that is, users who
          need the elements and users who may use them unconditionally. It therefore consists of two complementary parts:
        <ul>
          <li>
            <p>Implementation of accessibility features
              These features are mostly the W3C WAI standard. These include, for example, alternative image captions (alt), keyboard controls, audio transcription, or color modes. The goal is to
              connect with an organization that includes, for example, visually impaired people and use their additional suggestions based on feedback.</p>
          </li>
          <li>
            <p>A library with superior features
              Additional features that are not among the standard ones, but can be particularly beneficial for ordinary users and can also be implemented in general - independently of the web, the aim
              is to group them into a library. This library would then provide these functions with instructions on how to use them. Examples of these features include TTS (Text To Speech) or voice
              control.</p>
          </li>
        </ul>
        </p>
      </div>
    </section>
    <section class="section_aboutUs">
      <div>
        <h1 data-speaker>Usage</h1>
        <div class="readme_copy">
          <h3>Technologies Used</h3>
          <ul>
            <li>JS</li>
            <li>NODE.JS</li>
          </ul>
          <hr />
          <h3>Instalition and Usage</h3>
          <ul>
            <li>install library</li>
          </ul>
          <p>npm i blind-friendly-library</p>
          <ul>
            <li>This library needs to be imported into the main.js file in the project, specifically importing the <em>speaker.js</em> file (<code>setBFL()</code> function).</li>
          </ul>
          <p>import { setBFL } from '../../lib/speaker.js';</p>
          <ul>
            <li>Then run the <code>setBFL()</code> function and insert the parameters you have chosen to set the speaker's voice.</li>
          </ul>
          <p>setBFL(1,1,1.2,&quot;en&quot;); //(volume,rate,pitch,lang)</p>
          <ul>
            <li>
              <a href="https://bfl-t6ps.onrender.com/">demo</a>
            </li>
          </ul>
          <hr />
          <h3>Project Setup</h3>
          <ul>
            <li>The project has three main functions TTS (text to speech), SF (speech focus) and VC (voice control).</li>
          </ul>
          <p><strong>1. SF (speech focus)</strong></p>
          <ul>
            <li>Speech focus works by itself right after installing the library.</li>
            <li>Switched on with the <strong>1</strong> key.</li>
            <li>Switch between elements via the <code>TAB</code> key.</li>
          </ul>
          <p><strong>2. TTS (text to speech)</strong></p>
          <ul>
            <li>Text to speech works using custom <code>data-speaker</code> attributes. These are added to the elements to be read.</li>
          </ul>
          <p>&lt;p data-speaker&gt;Lorem ipsum dolor sit amet, consectetuer adipiscing elit.&lt;/p&gt;</p>
          <ul>
            <li>Text to speech is activated using the <strong>2</strong> key.</li>
            <li>Use the <strong>arrows</strong> <code>(&lt;-,-&gt;)</code> to move between elements.</li>
          </ul>
          <p><strong>3. VC (voice control)</strong></p>
          <ul>
            <li>This function works by using custom attributes <code>data-el-text</code>, which are loaded when this function is run and then searches them to see if what the user said is in them. The
              value of the custom attribute specifies the name by which the element can be found.</li>
          </ul>
          <p>&lt;a data-el-text=&quot;Home&quot;&gt;HOME&lt;/a&gt;</p>
          <p>&lt;a data-el-text=&quot;Home&quot; data-el-text-en=&quot;Home&quot; data-el-text-cs=&quot;Domů&quot;&gt;HOME&lt;/a&gt;</p>
          <ul>
            <li>Speech to text is enabled using the <strong>3</strong> key and then the user enters what is to be done.</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
};
</script>
