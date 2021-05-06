<template>
  <div class="w-full md:w-60 lg:w-72">
    <h2 class="font-semibold text-xl mb-8 md:mb-4">
      Filters:
    </h2>
    <div class="w-full border border-gray-200 shadow divide-y divide-gray-200">
      <pb-selectable-filters
        title="License"
        field="licenseCode"
      />
      <pb-selectable-filters
        title="Subject"
        field="about"
        :searchable="true"
      />
      <pb-selectable-filters
        title="Network"
        field="networkName"
        :searchable="true"
      />
      <pb-selectable-filters
        title="Collection"
        field="collections"
        :searchable="false"
        data-cy="collections-filter"
      />
      <date-range-filters
        title="Last Updated"
        field="lastUpdated"
      />
      <pb-selectable-filters
        title="Language"
        field="languageName"
        :searchable="true"
      />
      <pb-selectable-filters
        title="Publisher"
        field="publisherName"
        :searchable="true"
      />
    </div>
  </div>
</template>
<script>
import PbSelectableFilters from './PbSelectableFilters.vue';
import DateRangeFilters from './PbDateRangeFilters.vue';

export default {
  name: 'PbFilters',
  components: {
    DateRangeFilters,
    PbSelectableFilters
  },
};
</script>
