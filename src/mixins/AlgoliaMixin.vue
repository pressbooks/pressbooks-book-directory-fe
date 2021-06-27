<script>
import searchInsights from 'search-insights';

export default {
  // this will set the user token required by algolia
  beforeMount() {
    searchInsights('setUserToken', 'pressbooks-directory');
  },
  methods: {
    sendFilterAppliedInsight(filters, eventName) {
      this.sendInsight({
        insightsMethod: 'clickedFilters', 
        payload: {
          eventName: eventName || 'Filter Applied',
          filters
        },
      });
    },
    sendInsight(event) {
      const { insightsMethod, payload } = event;
      
      // Send event to algolia
      searchInsights(insightsMethod, {
        ...payload,
        index: this.$store.state.SClient.indexName, // This does not seem to be updated when changing the dropdown option
      });
    },
  }
};
</script>

