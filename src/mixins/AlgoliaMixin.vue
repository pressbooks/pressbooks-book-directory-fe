<script>
import searchInsights from 'search-insights';

export default {
  // this will set the user token required by algolia
  beforeMount() {
    searchInsights('setUserToken', 'pressbooks-directory');
  },
  methods: {
    sendFilterAppliedEvent(payload) {
      this.sendAlgoliaEvent({
        insightsMethod: 'clickedFilters', 
        payload: {
          ...payload, 
          eventName: 'Filter Applied'
        },
      });
    },
    sendAlgoliaEvent(event) {
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

