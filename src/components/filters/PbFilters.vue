<template>
  <div class="w-full md:w-1/4 md:pr-10 mb-12">
    <div class="font-semibold text-xl mb-8 md:mb-4">
      Filters:
    </div>
    <vsa-list>
      <pb-selectable-filters
        title="License"
        :searchable="false"
        field="licenseCode"
      />
    </vsa-list>
  </div>
</template>
<script>
import PbSelectableFilters from './PbSelectableFilters.vue';

export default {
  name: 'PbFilters',
  components: {
    PbSelectableFilters
  }
};

</script>