<template>
  <section class="section-cover">
    <div class="container mx-auto px-8 py-12">
      <div class="border-gray-300">
        <div class="w-full mx-auto text-center">
          <h2 class="section-title  font-bold text-4xl mb-12">
            Featured Collections
          </h2>
          <div class="items flex flex-row flex-wrap items-center">
            <pb-collection-card
              v-for="collection in 5"
              :key="collection"
            />
          </div>
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
