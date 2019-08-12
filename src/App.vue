<template>
  <div id="app">
    <section
      v-if="error"
      class="error"
    >
      <p class="error__message">
        {{ error }}
      </p>
      <button
        class="error__close"
        aria-label="close error"
        @click="error = ''"
      >
        x
      </button>
    </section>
    <section class="ms-font-m">
      <p class="ms-font-m">
        Enhancing Your Report
      </p>
    </section>

    <section class="samples ms-font-m">
      <h3>Don't just stand there</h3>
      <p class="ms-font-m">
        ...
      </p>
      <button
        class="ms-Button"
        @click="run"
      >
        <span class="ms-Button-label">operate</span>
      </button>
    </section>
  </div>
</template>

<script>
import { generateReport } from "./generateReport";

export default {
  name: "App",
  data() {
    return { error: "" };
  },
  methods: {
    async run() {
      try {
        await generateReport();
      } catch (error) {
        this.error = error;
      }
    }
  }
};
</script>

<style scoped>
.error{
  display:flex;
  color: red;
}
.error{
  font-size: 150%;
  border: 1px solid currentColor;
}
.error__message{
  flex:1;
}
.error__close{
  border:none;
  background: transparent;
  color:currentColor;
}
</style>
