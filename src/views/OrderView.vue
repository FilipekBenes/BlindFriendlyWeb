<template>
    <div class="order">
      <h2>Odeslat objednávku na koupi auta</h2>
      <form @submit.prevent="submitOrder">
        <div class="form-group">
          <label for="name">Jméno:</label>
          <input type="text" id="name" v-model="formData.name" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="formData.email" required />
        </div>
        <div class="form-group">
          <label for="phone">Telefonní číslo:</label>
          <input type="tel" id="phone" v-model="formData.phone" required />
        </div>
        <div class="form-group">
          <label for="carModel">Model auta:</label>
          <input type="text" id="carModel" v-model="formData.carModel" required />
        </div>
        <button type="submit">Odeslat objednávku</button>
      </form>
      <div v-if="orderSubmitted" class="success-message">
        Objednávka byla úspěšně odeslána!
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          name: '',
          email: '',
          phone: '',
          carModel: ''
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
  
  <style scoped>
  .order {
    max-width: 600px;
    margin: 44px auto;
  }
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="tel"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  button {
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #555;
  }
  
  .success-message {
    color: green;
    margin-top: 10px;
  }
  </style>
  