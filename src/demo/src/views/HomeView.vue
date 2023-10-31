<template>
  <div id="home">
    <div class="hero">
      <div>
        <h1>DEMO - Blind friendly web</h1>
      </div>
    </div>
    <section class="section_aboutUs">
      <div>
        <h1 sp-el>About us</h1>
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
    <section class="section_shapes">
      <div>
        <h1 sp-el>Type of shapes</h1>
        <div class="shapes">
          <div class="shape" v-for="shape in shape" :key="shape.id">
            <img :src="shape.img" alt="">
            <div>
              <h2>{{ shape.name }}</h2>
              <p sp-el>{{ shape.description }}</p>
              <div class="price_div">
                <p class="price">{{ shape.price }} $</p>
                <a href="">Order</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <TTS />
  </div>
</template>

<style scoped src="@/assets/scss/home.scss"  lang="scss"></style>

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
        },
        {
          id: 2,
          name: "Circle",
          description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
          price: 200000,
          img: "https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2018/02/18045941/2000px-Circle_-_black_simple.svg_-300x300.png",
        },
        {
          id: 3,
          name: "Rectangle",
          description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
          price: 300000,
          img: "https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2018/02/18050005/rectangle.jpg",
        },
        {
          id: 4,
          name: "Triangle",
          description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
          price: 400000,
          img: "https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2018/02/18050032/Simple_triangle.svg_-300x300.png",
        },
        {
          id: 5,
          name: "Polygons",
          description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
          price: 500000,
          img: "https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2018/02/18050103/PolygonsQuadrilateralTrianglesPentagonPolygonSongHeptagon-768x576.jpg",
        },
        {
          id: 2,
          name: "Parallelogram",
          description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
          price: 600000,
          img: "https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2018/02/18050154/5f9d9fbdf3a5f2b2141bd6ae90ef2418351e96d0.png",
        },
      ],
    };
  },
};
</script>
