<template>
  <specials-header
    title="Featured Books"
    store-name="featuredBooks"
    store-property="books"
    store-action="getFeaturedBooks"
  />
</template>

<script>
import SpecialsHeader from './commons/SpecialsHeader';
export default {
  name: 'FeaturedBooks',
  components: {SpecialsHeader}
};
</script>