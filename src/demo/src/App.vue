<template>
  <div id="app">
    <header>
      <div class="container">
        <a class="brand" href="/" aria-label="My logo">
          <div class="agriculture_icon_svg" alt="Logo"></div>
        </a>
        <nav>
          <router-link to="/" data-el-text="Home" data-el-text-cs="Domů" data-el-action="kliknout">Home</router-link>
          <router-link to="/demo" data-el-text="Demo" data-el-text-cs="Demo">Demo</router-link>
        </nav>
      </div>
    </header>

    <RouterView />

    <footer>
      <div class="container">
        <div class="copyright">
          <p><b>Copyright &copy; 2024,</b> <a href="https://www.npmjs.com/package/blind-friendly-library" data-el-text="blind friendly web">Blind friendly library</a></p>
        </div>
        <div class="contact">
          <p>Athor: <a href="mailto:00bfilip@gmail.com?subject=BFL - question" data-el-text="kontakt">Filip Beneš</a></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped src="@/assets/scss/app.scss" lang="scss"></style>

<style src="@/assets/scss/main.scss" lang="scss"></style>

<script>
export default {
  components: {},
};

</script>
