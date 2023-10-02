<template>
  <div id="home">
    <div class="hero">
      <div>
        <h1>Prodej aut</h1>
      </div>
    </div>
    <section class="section_aboutUs">
      <div>
        <h1>O nás</h1>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean vel massa quis mauris vehicula lacinia. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
          consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Vivamus ac leo pretium faucibus. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem
          purus in lacus. Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est. Etiam egestas wisi a erat. Nulla non arcu lacinia neque faucibus fringilla. Etiam dictum tincidunt diam. In
          sem justo, commodo ut, suscipit at, pharetra vitae, orci. In enim a arcu imperdiet malesuada. Ut tempus purus at lorem. Pellentesque arcu. Sed vel lectus. Donec odio tempus molestie, porttitor
          ut, iaculis quis, sem. Quisque porta. Pellentesque pretium lectus id turpis. Fusce suscipit libero eget elit. Etiam bibendum elit eget erat. Neque porro quisquam est, qui dolorem ipsum quia
          dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Etiam commodo dui eget wisi.

          Etiam bibendum elit eget erat. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Nullam dapibus fermentum
          ipsum. In enim a arcu imperdiet malesuada. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Quis
          autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Integer lacinia. Curabitur vitae
          diam non enim vestibulum interdum. Proin mattis lacinia justo. Cras elementum. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus.
          Fusce consectetuer risus a nunc. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
      </div>

    </section>
    <section class="section_cars">
      <div>
        <h1>Nabídka našich aut</h1>
        <div class="cars">
          <div class="car" v-for="auto in auta" :key="auto.id">
            <h2>{{ auto.nazev }}</h2>
            <p>{{ auto.popis }}</p>
            <p>{{ auto.cena }}</p>

            <!-- Popisek obrázku -->
            <div class="">
              {{ auto.popisObrazku }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped src="../assets/scss/home.scss"  lang="scss"></style>

<script>
export default {
  data() {
    return {
      auta: [
        {
          id: 1,
          nazev: "Škoda Octavia",
          popis: "Kombík s benzinovým motorem",
          cena: 600000,
          popisObrazku: "Škoda Octavia je populární rodinný vůz s prostorným interiérem a úsporným motorem.",
        },
        {
          id: 2,
          nazev: "Volkswagen Golf",
          popis: "Hatchback s dieselovým motorem",
          cena: 500000,
          popisObrazku: "Volkswagen Golf je ikonický hatchback, který je známý svou spolehlivostí a výkonem.",
        },
        {
          id: 3,
          nazev: "Audi A4",
          popis: "Sedan s hybridním motorem",
          cena: 700000,
          popisObrazku: "Audi A4 je prémiový sedan, který nabízí luxusní interiér a výkonný motor.",
        },
        {
          id: 4,
          nazev: "Tatra",
          popis: "Hatchback s dieselovým motorem",
          cena: 50000,
          popisObrazku: "Volkswagen Golf je ikonický hatchback, který je známý svou spolehlivostí a výkonem.",
        },
        {
          id: 5,
          nazev: "Opel",
          popis: "Hatchback s dieselovým motorem",
          cena: 900000,
          popisObrazku: "Volkswagen Golf je ikonický hatchback, který je známý svou spolehlivostí a výkonem.",
        },
        {
          id: 6,
          nazev: "Peguet",
          popis: "Hatchback s dieselovým motorem",
          cena: 300000,
          popisObrazku: "Volkswagen Golf je ikonický hatchback, který je známý svou spolehlivostí a výkonem.",
        },
      ],
    };
  },
};
</script>
