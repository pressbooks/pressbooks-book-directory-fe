<template>
  <pb-accordion :open="accordionOpened">
    <template #title>
      <span class="title font-headings font-semibold">
        {{ title }}
      </span>
    </template>
    <template #content>
      <t-datepicker
        v-model="datesModel"
        conjunction
        :inline="true"
        :months-per-view="1"
        :show="true"
        :range="true"
        time-picker-ok-button="Ok"
      />
      <t-button
        :disabled="datesModel.length < 2"
        class="w-full"
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
      datesModel: [],
      alias: '',
      defaultDateStart: new Date(2017, 7, 29), // Default starting date: 2017-08-29
      dates: {
        from: {
          date: this.defaultDateStart,
          inputFormat: ''
        },
        to: {
          date: new Date(),
          inputFormat: ''
        }
      },
      accordionOpened: false
    };
  },
  watch: {
    '$route.query': {
      deep: true,
      handler(q) {
        let query = {...q};
        if (query[this.alias] !== undefined) {
          const dates = query[this.alias].split('&&');
          const datesFilteredLength = dates.length;
          this.accordionOpened = true;
          switch (datesFilteredLength) {
          case 2:
            if (this.datesModel.length < 2) {
              dates[0] = dates[0].split('>=')[1];
              dates[1] = dates[1].split('<=')[1];
              this.convertTimestampsToDate(dates);
            }
            break;
          case 1:
            let splitString = '<=', datePresent = 'to';
            if (dates[0].search('>=') >= 0) {
              splitString = '>=';
              datePresent = 'from';
            }
            dates[0] = dates[0].split(splitString)[1];
            this.convertTimestampsToDate(dates, datePresent);
            break;
          default:
            this.resetDateData();
            break;
          }
          return true;
        }
        this.resetDateData();
        this.datesModel = [];
        this.accordionOpened = false;
      }
    }
  },
  mounted() {
    this.alias = this.$store.state.SClient.allowedFilters[this.field].alias;
  },
  methods: {
    resetDateData() {
      this.dates = {
        from: {
          date: this.defaultDateStart,
          inputFormat: ''
        },
        to: {
          date: new Date(),
          inputFormat: ''
        }
      };
    },
    filterByDateRange() {
      this.convertDatesToTimestamp();
      if (this.dates.to.timestamp > this.dates.from.timestamp) {
        let query = {...this.$route.query};
        let attribute = this.$store.state.SClient.allowedFilters[this.field].alias;
        query[attribute] = '>=' + this.dates.from.timestamp + '&&' + '<=' + this.dates.to.timestamp;
        this.$router.replace({ query });
      }
    },
    convertDatesToTimestamp() {
      let dateStart = new Date(this.datesModel[0] + ' 00:00:00');
      let dateEnd = new Date(this.datesModel[1] + ' 23:59:59');
      this.dates.from.timestamp  = (dateStart.getTime() / 1000) - (dateStart.getTimezoneOffset()*60);
      this.dates.to.timestamp = (dateEnd.getTime() / 1000) - (dateEnd.getTimezoneOffset()*60);
    },
    convertTimestampsToDate(timestampDates, datePresent = false) {
      if (datePresent) {
        this.resetDateData();
        this.dates[datePresent].date = new Date(timestampDates[0] * 1000);
        this.dates[datePresent].inputFormat = this.dates[datePresent].date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
      } else {
        this.dates.from.date = new Date(timestampDates[0] * 1000);
        this.dates.to.date = new Date(timestampDates[1] * 1000);
      }
      this.setDatesModelFromDatesProperty();
    },
    setDatesModelFromDatesProperty() {
      this.dates.from.inputFormat  = this.dates.from.date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
      this.dates.to.inputFormat = this.dates.to.date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
      this.datesModel = [
        this.dates.from.date.toLocaleString('fr-CA', {year: 'numeric', month:'numeric', day:'numeric', timeZone: 'UTC'}),
        this.dates.to.date.toLocaleString('fr-CA', {year: 'numeric', month:'numeric', day:'numeric', timeZone: 'UTC'})
      ];
    }
  }
};
</script>