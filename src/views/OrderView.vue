<template>
    <div class="order">
      <h2>Order your new live</h2>
      <form @submit.prevent="submitOrder">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="formData.name" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="formData.email" required />
        </div>
        <div class="form-group">
          <label for="phone">Telefon number:</label>
          <input type="tel" id="phone" v-model="formData.phone" required />
        </div>
        <div class="form-group">
          <label for="message">Message:</label>
          <input type="text" id="message" v-model="formData.message" required />
        </div>
        <button type="submit">Submit</button>
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
  
  <style scoped src="../assets/scss/order.scss" lang="scss"></style>
  