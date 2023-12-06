<template>
  <div id="app">
    <header>
      <div class="container">
        <div class="brand">
          <div class="agriculture_icon_svg"></div>
        </div>
          <nav>
              <router-link to="/" data-el-text="Home">Home</router-link>
              <router-link to="/order" data-el-text="I">Order</router-link>
          </nav>
      </div>
    </header>

    <RouterView/>

    <footer>
      <div class="container">
        <div class="copyright">
          &copy; 2023 <a href="/" data-el-text="blind friendly web">Blind friendly web</a>
        </div>
        <div class="contact">
          <a href="/kontakt" data-el-text="kontakt">Kontakt</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped src="@/assets/scss/app.scss"  lang="scss"></style>
<style src="@/assets/scss/main.scss" lang="scss"></style>

<script>
export default {
  components: {},
};

</script>
