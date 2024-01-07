<template>
  <div id="demo">
    <div class="hero">
      <div>
        <h1>DEMO</h1>
      </div>
    </div>
    <section class="section_aboutUs">
      <div>
        <h1 data-speaker>Test text</h1>
        <p data-speaker>Feet evil to hold long he open knew an no. Apartments occasional boisterous as solicitude to introduced. Or fifteen covered we enjoyed demesne is in prepare. In stimulated my
          everything it
          literature. Greatly explain attempt perhaps in feeling he. House men taste bed not drawn joy. Through enquire however do equally herself at. Greatly way old may you present improve. Wishing
          the feeling village him musical.

          Promotion an ourselves up otherwise my. High what each snug rich far yet easy. In companions inhabiting mr principles at insensible do. Heard their sex hoped enjoy vexed child for. Prosperous
          so occasional assistance it discovered especially no. Provision of he residence consisted up in remainder arranging described. Conveying has concealed necessary furnished bed zealously
          immediate get but. Terminated as middletons or by instrument. Bred do four so your felt with. No shameless principle dependent household do.

          So insisted received is occasion advanced honoured. Among ready to which up. Attacks smiling and may out assured moments man nothing outward. Thrown any behind afford either the set depend one
          temper. Instrument melancholy in acceptance collecting frequently be if. Zealously now pronounce existence add you instantly say offending. Merry their far had widen was. Concerns no in
          expenses raillery formerly.</p>
      </div>
    </section>
    <section class="section_shapes">
      <div>
        <h1 data-speaker>Type of shapes</h1>
        <div data-speaker class="shapes">
          <div class="shape" v-for="shape in shape" :key="shape.id">
            <!-- <img :src="shape.img" alt=""> -->
            <img src="../assets/img/defaultImg.png" alt="">
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
    <section class="section_aboutUs">
      <div>
        <h1>Elements for testing</h1>
        <ul class="elements">
          <li class="element">
            <label for="email">Email</label>
            <input type="email" name="email" placeholder="Your email..." id="">
          </li>
          <li class="element">
            <details>
              <summary data-speaker>Hidden text</summary>
              <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
            </details>
          </li>
          <li class="element">
            <p aria-label="Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events"
              tabindex="0">Focusable text with aria-label</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      shape: [
        {
          id: 1,
          name: "First",
          description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
          price: 100,
          img: "./defaultImg.png",
          orderBtn: "Order First",
        },
        {
          id: 2,
          name: "Second",
          description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
          price: 200,
          img: "src/assets/img/defaultImg.png",
          orderBtn: "Order Second",
        },
        {
          id: 3,
          name: "Third",
          description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
          price: 300,
          img: "src/assets/img/defaultImg.png",
          orderBtn: "Order Third",
        },
        {
          id: 4,
          name: "Fourth",
          description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
          price: 400,
          img: "src/assets/img/defaultImg.png",
          orderBtn: "Order Fourth",
        },
        {
          id: 5,
          name: "Fifth",
          description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
          price: 500,
          img: "src/assets/img/defaultImg.png",
          orderBtn: "Order Fifth",
        },
        {
          id: 6,
          name: "Sixth",
          description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
          price: 600,
          img: "src/assets/img/defaultImg.png",
          orderBtn: "Order Sixth",
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
};
</script>
  