<template>
  <div class="w-full md:w-60 lg:w-72">
    <h2 class="font-semibold text-2xl mb-4">
      Filters
    </h2>
    <div
      class="w-full border border-gray-200 shadow divide-y divide-gray-200"
      data-cy="facet-filters"
    >
      <component
        :is="filter.component"
        v-for="(filter, index) in filters"
        :key="index"
        :title="filter.title"
        :field="filter.field"
        :searchable="filter.searchable"
        :data-cy="filter.dataCy"
      />
    </div>
  </div>
</template>
<script>
import PbDateRangeFilters from './PbDateRangeFilters.vue';
import PbSelectableFilters from './PbSelectableFilters.vue';
import PbNumericFilters from './PbNumericFilters.vue';
import PbBooleanFilters from './PbBooleanFilters.vue';

export default {
  name: 'PbFilters',
  components: {
    PbBooleanFilters,
    PbNumericFilters,
    PbDateRangeFilters,
    PbSelectableFilters
  },
  data() {
    return {
      filters: [
        { component: 'pb-boolean-filters', title: 'Recommended', field: 'isRecommended', dataCy: 'recommended-filter', searchable: false },
        { component: 'pb-selectable-filters', title: 'License', field: 'licenseCode', dataCy: 'license-filter', searchable: false },
        { component: 'pb-selectable-filters', title: 'Subject', field: 'about', dataCy: 'subject-filter', searchable: true },
        { component: 'pb-selectable-filters', title: 'Network', field: 'networkName', dataCy: 'network-filter', searchable: true },
        { component: 'pb-selectable-filters', title: 'Collection', field: 'collections', dataCy: 'collections-filter', searchable: true },
        { component: 'pb-date-range-filters', title: 'Last Updated', field: 'lastUpdated', dataCy: 'last-updated-filter', searchable: false },
        { component: 'pb-selectable-filters', title: 'Language', field: 'languageName', dataCy: 'language-filter', searchable: true },
        { component: 'pb-selectable-filters', title: 'Publisher', field: 'publisherName', dataCy: 'publisher-filter', searchable: true },
        { component: 'pb-numeric-filters', title: 'Word Count', field: 'wordCount', dataCy: 'word-count-filter', searchable: false },
        { component: 'pb-numeric-filters', title: 'H5P Activities', field: 'h5pActivities', dataCy: 'h5p-filter', searchable: false },
        { component: 'pb-numeric-filters', title: 'Storage', field: 'storageSize', dataCy: 'storage-filter', searchable: false },
      ]
    };
  }
};
</script>
