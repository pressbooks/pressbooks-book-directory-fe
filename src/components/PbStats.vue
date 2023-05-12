<template>
  <ais-stats>
    <template
      #default="{ nbHits }"
    >
      <h3
        class="font-semibold text-2xl mb-6"
        data-cy="number-of-books"
        id="results"
      >
        Results:  {{ $filters.numberFormat(nbHits) }} books
      </h3>
    </template>
  </ais-stats>
</template>

<script>
export default {
  name: 'PbStats'
};
</script>
