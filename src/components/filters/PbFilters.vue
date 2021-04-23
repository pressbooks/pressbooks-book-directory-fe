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
      <pb-selectable-filters
        title="Subject"
        :searchable="true"
        field="about"
      />
      <pb-selectable-filters
        title="Network"
        :searchable="false"
        field="networkName"
      />
      <pb-selectable-filters
        title="Language"
        :searchable="false"
        field="languageName"
      />
      <pb-selectable-filters
        title="Publisher"
        :searchable="false"
        field="publisherName"
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