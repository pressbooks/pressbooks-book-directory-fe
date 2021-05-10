<template>
  <pb-accordion :open="opened">
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
            :data-cy="`from-date-${field}`"
          />
        </div>
        <div class="p-2">
          <t-datepicker
            v-model="dates.to"
            placeholder="To date"
            :data-cy="`to-date-${field}`"
          />
        </div>
      </div>

      <div class="p-2">
        <t-button
          :disabled="disabled"
          class="w-full"
          @click="filterByDateRange"
        >
          Go
        </t-button>
      </div>
    </template>
  </pb-accordion>
</template>

<script>
import { format, fromUnixTime, getUnixTime, isValid, parse } from 'date-fns';
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
      dates: {
        start: '',
        to: '',
      },
      opened: false,
    };
  },
  computed: {
    alias() {
      return this.$store.state.SClient.allowedFilters[this.field].alias;
    },
    disabled() {
      return this.dates.start === '' && this.dates.to === '';
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
        }

        if (toRegex.test(queryString)) {
          [, to] = queryString.match(toRegex);
        }

        this.opened = true;
        this.dates = {
          start: start ? format(fromUnixTime(start), 'yyyy-MM-dd'): '',
          to: to ? format(fromUnixTime(to), 'yyyy-MM-dd') : '',
        };
      }
    }
  },
  methods: {
    reset() {
      this.opened = false;
      this.dates = {
        start: '',
        to: '',
      };
    },
    buildQueryString() {
      let queryString = null;
      let start = parse(`${this.dates.start} 00:00:00`, 'yyyy-MM-dd H:m:s', new Date);
      let to = parse(`${this.dates.to} 23:59:59`, 'yyyy-MM-dd H:m:s', new Date);

      let timestamps = {
        start: getUnixTime(start),
        to: getUnixTime(to) - to.getTimezoneOffset() * 60
      };

      if (isValid(start)) {
        queryString = `>=${timestamps.start}`;
      }

      if (isValid(to)) {
        queryString = queryString ? `${queryString}&&<=${timestamps.to}` : `<=${timestamps.to}`;
      }

      return queryString;
    },
    filterByDateRange() {
      let query = { ... this.$route.query };
      let queryString = this.buildQueryString();

      if (! queryString) {
        return;
      }

      return this.$router.replace({
        query: {
          ...query,
          [this.alias]: queryString
        }
      });
    },
  }
};
</script>
