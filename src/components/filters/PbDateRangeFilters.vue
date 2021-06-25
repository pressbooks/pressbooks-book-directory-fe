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
          <t-datepicker
            v-model="dates.start"
            placeholder="From date"
            :max-date="dates.to"
            :data-cy="`from-date-${field}`"
          >
            <template slot="clearButton">
              <span class="sr-only">Clear from date value</span>
              <pb-clear-button-icon />
            </template>
          </t-datepicker>
        </div>
        <div class="p-2">
          <t-datepicker
            v-model="dates.to"
            placeholder="To date"
            :min-date="dates.start"
            :data-cy="`to-date-${field}`"
          >
            <template slot="clearButton">
              <span class="sr-only">Clear to date value</span>
              <pb-clear-button-icon />
            </template>
          </t-datepicker>
        </div>
      </div>

      <div class="p-2">
        <t-button
          class="w-full"
          :disabled="disabled"
          :data-cy="`apply-filter-${field}`"
          @click="filterByDateRange"
        >
          <span class="sr-only">{{ `Apply ${title} filter` }}</span>
          <span aria-hidden="true">Go</span>
        </t-button>
      </div>
    </template>
  </pb-accordion>
</template>

<script>
import dayjs from 'dayjs';
import PbAccordion from '../PbAccordion.vue';
import PbClearButtonIcon from '../PbClearButtonIcon.vue';

export default {
  name: 'DateRangeFilters',
  components: {
    PbAccordion,
    PbClearButtonIcon,
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

        let toRegex = new RegExp(/\<=(.*)/); // grab anything after <=
        let startRegex = queryString.includes('&&')
          ? new RegExp(/\>=(.*)\&&/) // grab anything between >= and &&
          : new RegExp(/\>=(.*)/); // grab anything after >=;

        let start = null;
        let to = null;

        if (startRegex.test(queryString)) {
          [, start] = queryString.match(startRegex);
          start = dayjs.unix(start);
        }

        if (toRegex.test(queryString)) {
          [, to] = queryString.match(toRegex);
          to = dayjs.unix(to);
        }

        this.opened = true;
        this.dates = {
          start: start && start.isValid() ? start.utc().format('YYYY-MM-DD'): null,
          to: to && to.isValid() ? to.utc().format('YYYY-MM-DD') : null,
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
    buildQueryString() {
      let queryString = null;

      let start = dayjs.utc(this.dates.start).startOf('day');
      let to = dayjs.utc(this.dates.to).endOf('day');

      if (to.isBefore(start)) {
        return;
      }

      if (start.isValid()) {
        queryString = `>=${start.unix()}`;
      }

      if (to.isValid()) {
        queryString = queryString ? `${queryString}&&<=${to.unix()}` : `<=${to.unix()}`;
      }

      return queryString;
    },
    filterByDateRange() {
      let query = { ... this.$route.query };
      let queryString = this.buildQueryString();

      if (! queryString) {
        return;
      }

      if (query[this.alias] === queryString) {
        return;
      }

      this.sendClickEvent();

      return this.$router.replace({
        query: {
          ...query,
          [this.alias]: queryString
        }
      });
    },
    sendClickEvent() {
      let dates = [
        this.dates.start ? `${this.alias}:>=${this.dates.start}` : null,
        this.dates.to ? `${this.alias}:<=${this.dates.to}` : null
      ];

      this.sendFilterAppliedEvent({
        filters: dates.filter(d => d)
      });
    },
  }
};
</script>
