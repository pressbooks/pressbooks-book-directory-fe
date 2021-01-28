<template>
  <ais-stats>
    <template
      #default="{ nbHits }"
      class="filters__stats"
    >
      <div class="filters__stats__results">
        <span class="container__results">Results: </span>
        <span class="container__results-hits">
          {{ nbHits }} / {{ $store.state.stats.totalBooksFixed }} shown
        </span>
      </div>
    </template>
  </ais-stats>
</template>

<script>
export default {
  name: 'Stats'
};
</script>