import searchInsights from 'search-insights';

export default {
  // this will set the user token required by algolia
  beforeMount() {
    searchInsights('init', {
      appId: import.meta.env.VITE_ALGOLIA_APP_ID,
      apiKey: import.meta.env.VITE_ALGOLIA_API_READ_KEY,
    });

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
      const { sort } = this.$route.query;
      const { insightsMethod, payload } = event;

      const index = this.$store.state.SClient.availableIndexes.find(
        ({orderedBy}) => orderedBy === sort
      );
      
      // Send event to algolia
      searchInsights(insightsMethod, {
        ...payload,
        index: index ? index.value : this.$store.state.SClient.indexName,
      });
    },
  }
};
