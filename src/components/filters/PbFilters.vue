<template>
  <section
    class="w-full md:w-60 lg:w-72"
    aria-labelledby="filters"
  >
    <h3
      id="filters"
      class="font-semibold text-2xl mb-4"
    >
      Filters
    </h3>
    <div
      class="w-full border border-gray-200 shadow divide-y divide-gray-200"
      data-cy="facet-filters"
    >
      <component
        :is="filter.component"
        v-for="(filter, index) in filters"
        :key="index"
        v-bind="{...filter.props}"
      />
    </div>
  </section>
</template>
<script>
import PbDateRangeFilters from './PbDateRangeFilters.vue';
import PbSelectableFilters from './PbSelectableFilters.vue';
import PbNumericFilters from './PbNumericFilters.vue';

export default {
  name: 'PbFilters',
  components: {
    PbNumericFilters,
    PbDateRangeFilters,
    PbSelectableFilters
  },
  data() {
    return {
      filters: [
        {
          component: 'pb-selectable-filters',
          props: { title: 'License', field: 'licenseCode', 'data-cy': 'license-filter' }
        },
        {
          component: 'pb-selectable-filters',
          props: { title: 'Subject', field: 'about', 'data-cy': 'subject-filter', searchable: true }
        },
        {
          component: 'pb-selectable-filters',
          props: { title: 'Network', field: 'networkName', 'data-cy': 'network-filter', searchable: true }
        },
        {
          component: 'pb-selectable-filters',
          props: { title: 'Collection', field: 'collections', 'data-cy': 'collections-filter', searchable: true }
        },
        {
          component: 'pb-date-range-filters',
          props: { title: 'Last Updated', field: 'lastUpdated', 'data-cy': 'last-updated-filter' }
        },
        {
          component: 'pb-selectable-filters',
          props: { title: 'Language', field: 'languageName', 'data-cy': 'language-filter', searchable: true }
        },
        {
          component: 'pb-selectable-filters',
          props: { title: 'Institution', field: 'institutionName', 'data-cy': 'institution-filter', searchable: true }
        },
        {
          component: 'pb-selectable-filters',
          props: { title: 'Publisher', field: 'publisherName', 'data-cy': 'publisher-filter', searchable: true }
        },
        {
          component: 'pb-numeric-filters',
          props: { title: 'Word Count', field: 'wordCount', 'data-cy': 'word-count-filter' }
        },
        {
          component: 'pb-numeric-filters',
          props: { title: 'H5P Activities', field: 'h5pActivities', 'data-cy': 'h5p-filter' }
        }
      ]
    };
  }
};
</script>
