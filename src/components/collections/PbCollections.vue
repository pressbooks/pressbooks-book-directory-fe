<template>
  <section class="section-cover">
    <div class="container mx-auto px-8">
      <div class="border-t border-gray-300">
        <div class="w-full mx-auto py-20 text-center">
          <div class="section-title text-4xl mb-12">
            Featured Collections
          </div>
          <pb-collection-card></pb-collection-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PbCollectionCard from './PbCollectionCard.vue';
export default {
  name: 'PbCollections',
  components: {PbCollectionCard}
};
</script>

<style scoped>

</style>