<template>
  <pb-accordion
    :open="opened"
    :data-cy-button="`${field}`"
  >
    <template #title>
      <span class="title font-headings font-semibold">
        {{ title }}
      </span>
    </template>
    <template #content>
      <div>
        <div class="p-2">
          <Datepicker
            v-model="dates.start"
            :text-input="true"
            :text-input-options="{
              enterSubmit: true,
              tabSubmit: true,
            }"
            utc="preserve"
            placeholder="From date"
            :max-date="dates.to"
            :data-cy="`from-date-${field}`"
            format="yyyy-MM-dd"
            :enable-time-picker="false"
            :auto-apply="true"
          >
            <template #day="{ date, day }">
              <span :data-date="formatDate(date)">
                {{ day }}
              </span>
            </template>
            >
          </Datepicker>
        </div>
        <div class="p-2">
          <Datepicker
            v-model="dates.to"
            :text-input="true"
            placeholder="To date"
            :min-date="dates.start"
            utc="preserve"
            :data-cy="`to-date-${field}`"
            format="yyyy-MM-dd"
            :enable-time-picker="false"
            :auto-apply="true"
          >
            <template #day="{ date, day }">
              <span :data-date="formatDate(date)">
                {{ day }}
              </span>
            </template>
          </Datepicker>
        </div>
      </div>

      <div class="p-2">
        <button
          class="w-full rounded-full bg-pb-red text-white p-2"
          :disabled="disabled"
          :data-cy="`apply-filter-${field}`"
          @click="filterByDateRange"
        >
          <span class="sr-only">{{ `Apply ${title} filter` }}</span>
          <span aria-hidden="true">Go</span>
        </button>
      </div>
    </template>
  </pb-accordion>
</template>

<script>
import dayjs from 'dayjs';
import PbAccordion from '../PbAccordion.vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(timezone);

export default {
  name: 'DateRangeFilters',
  components: {
    PbAccordion,
    Datepicker,
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
      dates: {
        start: null,
        to: null,
      },
      opened: false,
    };
  },
  computed: {
    alias() {
      return this.$store.state.SClient.allowedFilters[this.field].alias;
    },
    disabled() {
      return !this.dates.start && !this.dates.to;
    }
  },
  watch: {
    '$route.query': {
      deep: true,
      handler(query) {
        if (query[this.alias] === undefined) {
          return this.reset();
        }

        let queryString = query[this.alias];

        let start = null;
        let to = null;

        // Both datePublished and lastUpdated now use Unix timestamps
        let toRegex = new RegExp(/\<=(.*)/); // grab anything after <=
        let startRegex = queryString.includes('&&')
          ? new RegExp(/\>=(.*)\&&/) // grab anything between >= and &&
          : new RegExp(/\>=(.*)/); // grab anything after >=;

        if (startRegex.test(queryString)) {
          [, start] = queryString.match(startRegex);
          start = dayjs.unix(start); // Parse Unix timestamp
        }

        if (toRegex.test(queryString)) {
          [, to] = queryString.match(toRegex);
          to = dayjs.unix(to); // Parse Unix timestamp
        }

        this.opened = true;
        this.dates = {
          start: start && start.isValid() ? start.format('YYYY-MM-DD') : null,
          to: to && to.isValid() ? to.format('YYYY-MM-DD') : null,
        };
      }
    }
  },
  methods: {
    reset() {
      this.opened = false;
      this.dates = {
        start: null,
        to: null,
      };
    },
    formatDate(date) {
      return dayjs.tz(date, 'UTC').format('YYYY-MM-DD');
    },
    buildQueryString() {
      let queryString = null;

      if (this.dates.start) {
        let start = dayjs.tz(this.dates.start, 'UTC').startOf('day');
        if (start.isValid()) {
          queryString = `>=${start.unix()}`;
        }
      }

      if (this.dates.to) {
        let to = dayjs.tz(this.dates.to, 'UTC').endOf('day');
        if (to.isValid()) {
          // Check if end date is before start date
          if (this.dates.start && to.isBefore(dayjs.tz(this.dates.start, 'UTC').startOf('day'))) {
            return null; // Invalid range
          }
          
          queryString = queryString ? `${queryString}&&<=${to.unix()}` : `<=${to.unix()}`;
        }
      }

      return queryString;
    },
    filterByDateRange() {
      let query = { ... this.$route.query };
      let queryString = this.buildQueryString();

      if (!queryString) {
        // Remove the filter if no dates are selected
        delete query[this.alias];
      } else {
        // Set the filter with the query string
        query[this.alias] = queryString;
      }

      this.sendClickInsight();

      return this.$router.replace({
        query: query
      });
    },
    sendClickInsight() {
      let dates = [
        this.dates.start ? `${this.alias}:>=${this.dates.start}` : null,
        this.dates.to ? `${this.alias}:<=${this.dates.to}` : null
      ];

      this.sendFilterAppliedInsight(
        dates.filter(d => d)
      );
    },
  }
};
</script>
