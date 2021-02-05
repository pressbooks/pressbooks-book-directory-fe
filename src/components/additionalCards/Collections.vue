<template>
  <specials-header
    title="Featured Collections"
    store-name="collections"
    store-property="collectionHeaderCardObjects"
    store-action="getCollections"
  />
</template>

<script>
import SpecialsHeader from './commons/SpecialsHeader';
export default {
  name: 'Collections',
  components: {SpecialsHeader}
};
</script>