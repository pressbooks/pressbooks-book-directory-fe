<template>
  <pb-accordion>
    <template #title>
      <span class="title font-headings font-semibold">
        {{ title }}
      </span>
    </template>
    <template #content>
      <t-datepicker
        v-model="date"
        :initial-date="initialDate"
        conjunction
        :inline="true"
        :months-per-view="1"
        :show="true"
        :range="true"
        time-picker-ok-button="Ok"
      />
      <t-button
        variant="secondary"
        :disabled="date.length < 2"
        @click="filterByDateRange()"
      >
        Go
      </t-button>
    </template>
  </pb-accordion>
</template>

<script>
import PbAccordion from '../PbAccordion.vue';
export default {
  name: 'DateRangeFilters',
  components: {
    PbAccordion
  },
  props: {
    field: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      date: [],
      dateStartFormatted: '',
      dateEndFormatted: '',
      alias: '',
      initialDate: []
    };
  },
  watch: {
    '$route.query': {
      deep: true,
      handler(q) {
        let query = {...q};
        if (query[this.alias] !== undefined && this.date.length < 2) {
          const dates = query[this.alias].split('&&');
          if (dates.length === 2) {
            dates[0] = dates[0].split('>=')[1];
            dates[1] = dates[1].split('<=')[1];
            this.convertTimestampsToDate(dates);
          }
        }
      }
    }
  },
  mounted() {
    this.alias = this.$store.state.SClient.allowedFilters[this.field].alias;
  },
  methods: {
    filterByDateRange() {
      this.convertDatesToTimestamp();
      if (this.dateEndFormatted > this.dateStartFormatted) {
        let query = {...this.$route.query};
        let attribute = this.$store.state.SClient.allowedFilters[this.field].alias;
        query[attribute] = '>=' + this.dateStartFormatted + '&&' + '<=' + this.dateEndFormatted;
        this.$router.replace({ query });
      }
    },
    convertDatesToTimestamp() {
      let dateStart = new Date(this.date[0] + ' 00:00:00');
      let dateEnd = new Date(this.date[1] + ' 23:59:59');
      this.dateStartFormatted = (dateStart.getTime() / 1000) - (dateStart.getTimezoneOffset()*60);
      this.dateEndFormatted = (dateEnd.getTime() / 1000) - (dateEnd.getTimezoneOffset()*60);
    },
    convertTimestampsToDate(timestampDates) {
      const dateFrom = new Date(timestampDates[0] * 1000);
      const dateTo = new Date(timestampDates[1] * 1000);
      this.dateStartFormatted  = dateFrom.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });
      this.dateEndFormatted = dateTo.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });
      this.date[0] = dateFrom.toLocaleString('fr-CA', {year: 'numeric', month:'numeric', day:'numeric'});
      this.date[1] = dateTo.toLocaleString('fr-CA', {year: 'numeric', month:'numeric', day:'numeric'});
    }
  }
};
</script>