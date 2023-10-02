<template>
  <div id="app">
    <header>
      <div class="container">
        <div class="brand">
          <div class="agriculture_icon_svg"></div>
        </div>
          <nav>
              <router-link to="/home">Domov</router-link>
              <router-link to="/order">Objednat si</router-link>
          </nav>
      </div>
    </header>

    <RouterView/>

    <footer>
      <div class="container">
        <div class="copyright">
          &copy; 2023 <a href="/">Blind friendly web</a>
        </div>
        <div class="social">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
        <div class="contact">
          <a href="/kontakt">Kontakt</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped src="./assets/scss/app.scss"  lang="scss"></style>
<style src="./assets/scss/main.scss" lang="scss"></style>

<script>
export default {
  components: { },
  data() {
  },
};

</script>
