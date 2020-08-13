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
              <v-col cols="6">
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
                      persistent-hint
                      prepend-icon="event"
                      v-bind="attrs"
                      @blur="dateStart = parseDate(dateStartFormatted)"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="dateStart"
                    no-title
                  />
                </v-menu>
              </v-col>
              <v-col cols="6">
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
                      persistent-hint
                      prepend-icon="event"
                      v-bind="attrs"
                      @blur="dateEnd = parseDate(dateEndFormatted)"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="dateEnd"
                    no-title
                  />
                </v-menu>
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
            const [year, month, day] = date.split('-');
            return `${month}/${day}/${year}`;
        },
        parseDate (date) {
            if (!date) return null;
            let dateObj = new Date(date);
            return Math.floor(dateObj.getTime());
        },
        clearFilters() {
            this.dateStart = '';
            this.dateEnd ='';
            let query = {...this.$route.query};
            delete query[this.alias];
            this.$router.replace({ query });
        },
    },
    applyFilter() {
        // @todo: Update this method to apply date ranges in miliseconds
        let query = {...this.$route.query};
        let attribute = this.$store.state.SClient.allowedFilters[this.field].alias;
        let min = parseInt(this.number.min);
        let max = parseInt(this.number.max);

        if (min > max) {
            this.number.max = 0;
            query[attribute] = '>=' + min;
            this.$router.replace({ query });
            return;
        }

        query[attribute] = '>=' + min + '&&' + '<=' + max;
        this.$router.replace({ query });
    }

};
</script>