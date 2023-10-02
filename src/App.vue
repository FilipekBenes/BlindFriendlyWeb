<template>
  <div id="app">
    <h1>Prodej aut</h1>

    <ul>
      <li v-for="auto in auta" :key="auto.id">
        <h2>{{ auto.nazev }}</h2>
        <p>{{ auto.popis }}</p>
        <p>{{ auto.cena }}</p>

        <!-- Popisek obrázku -->
        <div class="caption">
          {{ auto.popisObrazku }}
        </div>
      </li>
    </ul>

    <button @click="pridatAuto">Přidat auto</button>
  </div>
</template>

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
        }
        ],
    };
  },
  methods: {
    pridatAuto() {
      // TODO: Implementace přidání auta
    },
  },
};
</script>

<style>
  body {
    font-size: 16px;
    line-height: 1.5;
  }

  h1 {
    font-size: 24px;
  }

  p {
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    border-bottom: 1px solid #ccc;
    padding: 10px;
  }

  .caption {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    color: #fff;
    text-align: center;
  }
</style>
