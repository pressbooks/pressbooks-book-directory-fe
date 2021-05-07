<template>
  <div class="w-full md:w-60 lg:w-72">
    <h2 class="font-semibold text-2xl mb-4 md:mb-4">
      Filters
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
      <pb-date-range-filters
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
import PbDateRangeFilters from './PbDateRangeFilters.vue';
import PbSelectableFilters from './PbSelectableFilters.vue';

export default {
  name: 'PbFilters',
  components: {
    PbDateRangeFilters,
    PbSelectableFilters
  },
};
</script>
