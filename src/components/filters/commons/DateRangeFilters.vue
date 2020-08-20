<template>
  <v-list-group
    :id="'filter-' + field"
    sub-group
    value="true"
  >
    <template #activator>
      <v-list-item-title>{{ uppercase(title) }}</v-list-item-title>
    </template>

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <v-form @submit.prevent="applyFilter">
            <v-row>
              <v-col cols="4">
                <v-menu
                  ref="start"
                  v-model="start"
                  :close-on-content-click="true"
                  transition="scale-transition"
                  offset-y
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateStartFormatted"
                      class="date-picker"
                      label="From"
                      readonly
                      persistent-hint
                      prepend-icon="event"
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    :id="'min-date-' + field"
                    v-model="dateStart"
                    no-title
                  />
                </v-menu>
              </v-col>
              <v-col cols="4">
                <v-menu
                  ref="end"
                  v-model="end"
                  :close-on-content-click="true"
                  transition="scale-transition"
                  offset-y
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateEndFormatted"
                      class="date-picker"
                      label="To"
                      readonly
                      persistent-hint
                      prepend-icon="event"
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    :id="'max-date-' + field"
                    v-model="dateEnd"
                    no-title
                  />
                </v-menu>
              </v-col>
              <v-col cols="4">
                <v-btn
                  :id="'btn-date-' + field"
                  type="submit"
                  :disabled="!dateEndFormatted || !dateStartFormatted"
                >
                  Go
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <div class="ais-ClearRefinements">
        <v-btn
          tile
          @click="clearFilters()"
        >
          CLEAR
        </v-btn>
      </div>
    </v-list-item>
  </v-list-group>
</template>

<script>
export default {
  name: 'DateRange',
  filters: {
    uppercase(t) {
      return t.toUpperCase();
    }
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
  data: vm => ({
    dateStart: null,
    dateEnd: null,
    dateStartFormatted: '',
    dateEndFormatted: '',
    start: false,
    end: false,
  }),
  watch: {
    dateStart (val) {
      this.dateStartFormatted = this.formatDate(this.dateStart);
    },
    dateEnd (val) {
      this.dateEndFormatted = this.formatDate(this.dateEnd);
    },
    '$route.query': {
      deep: true,
      handler(q) {
        let query = {...q};
        if (query[this.alias] !== undefined) {
          let d1, d2, dateObjFrom, dateObjTo;
          let dates = query[this.alias].split('&&');
          if (dates.length === 1) {
            if (dates[0].search('>') >= 0) {
              d1 = dates[0].split('>=')[1];
              dateObjFrom = new Date(parseInt(d1) * 1000);
              this.dateStartFormatted = this.inputFormatDate(dateObjFrom);
            } else {
              d2 = dates[0].split('<=')[1];
              dateObjTo = new Date(parseInt(d2) * 1000);
              this.dateEndFormatted = this.inputFormatDate(dateObjTo);
            }
          } else {
            d1 = dates[0].split('>=')[1];
            d2 = dates[1].split('<=')[1];
            dateObjFrom = new Date(parseInt(d1) * 1000);
            dateObjTo = new Date(parseInt(d2) * 1000);
            this.dateStartFormatted = this.inputFormatDate(dateObjFrom);
            this.dateEndFormatted = this.inputFormatDate(dateObjTo);
          }
        } else {
          this.dateStart = '';
          this.dateEnd ='';
        }
      }
    }
  },
  mounted() {
    this.alias = this.$store.state.SClient.allowedFilters[this.field].alias;
  },
  methods: {
    uppercase(t) {
      return t.toUpperCase();
    },
    formatDate (date) {
      if (!date) return null;
      if (typeof date === 'number') {
        date = new Date(date);
        return this.inputFormatDate(date);
      }
      const [year, month, day] = date.split('-');
      return `${month}/${day}/${year}`;
    },
    parseDate (date) {
      if (!date) return null;
      let dateObj = new Date(date);
      return Math.floor(dateObj.getTime());
    },
    inputFormatDate(d) {
      let month = (d.getUTCMonth()+1) < 10 ? '0' + (d.getUTCMonth()+1) : (d.getUTCMonth()+1);
      let day = d.getUTCDate() < 10 ? '0' + d.getUTCDate() : d.getUTCDate();
      return month + '/' + day + '/' + d.getUTCFullYear();
    },
    clearFilters() {
      this.dateStart = '';
      this.dateEnd ='';
      let query = {...this.$route.query};
      delete query[this.alias];
      this.$router.replace({ query });
    },
    applyFilter() {
      let startObject = new Date(this.dateStart);
      let endObject = new Date(this.dateEnd);
      let startTimestamp = startObject.getTime() / 1000;
      let endTimestamp = endObject.getTime() / 1000;
      let query = {...this.$route.query};
      let attribute = this.$store.state.SClient.allowedFilters[this.field].alias;

      if (startTimestamp > endTimestamp) {
        this.dateEnd = '';
        this.dateEndFormatted = '';
        query[attribute] = '>=' + startObject;
        this.$router.replace({ query });
        return;
      }

      query[attribute] = '>=' + startTimestamp + '&&' + '<=' + endTimestamp;
      this.$router.replace({ query });
    }
  }
};
</script>