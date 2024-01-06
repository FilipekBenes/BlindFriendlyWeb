<template>
  <section class="section_shapes">
    <div>
      <h1 data-speaker>Type of shapes</h1>
      <div data-speaker class="shapes">
        <div class="shape" v-for="shape in shape" :key="shape.id">
          <img :src="shape.img" alt="">
          <div>
            <h2>{{ shape.name }}</h2>
            <p data-speaker>{{ shape.description }}</p>
            <div class="price_div">
              <p class="price">{{ shape.price }} $</p>
              <a href="" data-el-text="Order" data-el-text-en="OrderEn" data-el-text-cs="Objednat" data-el-action="click">{{ shape.orderBtn }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section
    aria-label="Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events"
    tabindex="0">Gallerysefoims</section>
  <input type="email" name="" placeholder="Muuuj emaiil..." id="">
  <a href="/"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2b/Arabska-gymnazium_vchod.jpg" style="max-width: 200px;" alt="můj obrázek"></a>
  <section>
    <details>
      <summary data-speaker>Epcot Center</summary>
      <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
    </details>
  </section>
</template>
  
<script>
export default {
  data() {
    return {
      shape: [
        {
          id: 1,
          name: "Square",
          description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
          price: 100000,
          img: "https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2018/02/18045916/GM05.gif",
          orderBtn: "Order Square",
        },
        {
          id: 2,
          name: "Circle",
          description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
          price: 200000,
          img: "https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2018/02/18045941/2000px-Circle_-_black_simple.svg_-300x300.png",
          orderBtn: "Order Circle",
        },
        {
          id: 3,
          name: "Rectangle",
          description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
          price: 300000,
          img: "https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2018/02/18050005/rectangle.jpg",
          orderBtn: "Order Rectangle",
        },
        {
          id: 4,
          name: "Triangle",
          description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
          price: 400000,
          img: "https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2018/02/18050032/Simple_triangle.svg_-300x300.png",
          orderBtn: "Order Triangle",
        },
        {
          id: 5,
          name: "Polygons",
          description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
          price: 500000,
          img: "https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2018/02/18050103/PolygonsQuadrilateralTrianglesPentagonPolygonSongHeptagon-768x576.jpg",
          orderBtn: "Order Polygons",
        },
        {
          id: 2,
          name: "Parallelogram",
          description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
          price: 600000,
          img: "https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2018/02/18050154/5f9d9fbdf3a5f2b2141bd6ae90ef2418351e96d0.png",
          orderBtn: "Order Parallelogram",
        },
      ],

      formData: {
        name: '',
        email: '',
        phone: '',
        message: ''
      },
      orderSubmitted: false
    };
  },
  methods: {
    submitOrder() {
      // Zde můžete provést logiku pro odeslání objednávky, například volání API
      // Po úspěšném odeslání objednávky můžete nastavit orderSubmitted na true
      this.orderSubmitted = true;
    }
  }
};
</script>
  
<style scoped src="@/assets/scss/demo.scss" lang="scss"></style>
  