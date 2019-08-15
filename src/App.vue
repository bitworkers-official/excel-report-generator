<template>
  <div id="app">
    <section v-if="error" class="error">
      <p class="error__message">
        {{ error }}
      </p>
      <button class="error__close" aria-label="close error" @click="error = ''">
        x
      </button>
    </section>

    <form>
      <fieldset :disabled="busy">
        <label for="period">Period</label>
        <select id="period" v-model="selectedPeriod" name="period">
          <option
            v-for="period in periods"
            :key="period.toString()"
            :value="period"
          >
            {{ formatPeriod(period) }}
          </option>
        </select>
        <label for="region">Region</label>
        <select id="region" name="region" v-model="selectedRegion">
          <option v-for="region in regions" :key="region.label" :value="region">
            {{ region.label }}
          </option>
        </select>
        <button type="submit" @click.prevent="run">
          <span>run</span>
        </button>
      </fieldset>
    </form>
  </div>
</template>

<script>
import { generateReport } from "./generateReport";
import { addMonths, subMonths, format } from "date-fns";
import regions from "./regions.json";

function computePeriods() {
  let pastMonths = 3;
  let futureMonths = 2;
  const now = new Date();
  let dates = [];
  for (let i = pastMonths; i >= 1; i--) {
    dates.push(subMonths(now, i));
  }
  dates.push(now);
  for (let j = 1; j <= futureMonths; j++) {
    dates.push(addMonths(now, j));
  }
  return dates;
}

function formatPeriod(date) {
  return format(date, "MMMM yyyy");
}

const periods = computePeriods();

export default {
  name: "App",
  data() {
    return {
      busy: false,
      error: "",
      periods,
      regions,
      selectedPeriod: periods[0],
      selectedRegion: regions[0]
    };
  },
  methods: {
    formatPeriod,
    async run() {
      this.busy = true;
      try {
        await generateReport({
          period: this.selectedPeriod,
          region: this.selectedRegion.code
        });
      } catch (error) {
        this.error = error;
      } finally {
        this.busy = false;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
button::-moz-focus-inner
  border none

:global(body)
  font-family Arial, Helvetica, sans-serif

.error
  color red
  display flex

.error
  border 1px solid currentColor
  font-size 150%

.error__message
  flex 1

.error__close
  background transparent
  border none
  color currentColor

fieldset
  border none

fieldset
  align-items center
  display grid
  grid-template-columns min-content min-content

label
  margin-right 0.5rem

button[type='submit']
  background #217346
  border none
  border-radius 5px
  color white
  cursor pointer
  margin-top 1rem
  outline none
  padding 0.5rem 1rem

  &:hover, &:focus
    background #2d9c5f
</style>
