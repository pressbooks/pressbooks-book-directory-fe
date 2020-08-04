<template>
  <ais-stats>
    <div slot-scope="{ nbHits }" class="filters__stats">
      <div class="filters__stats__results">
        <span class="container__results">Results: </span>
        <span class="container__results-hits" >
            {{ nbHits }} / {{ $store.state.stats.totalBooks }} shown
        </span>
      </div>
    </div>
  </ais-stats>
</template>

<script>
export default {
  name: 'Stats'
}
</script>