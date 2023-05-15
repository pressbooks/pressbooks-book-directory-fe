<template>
  <ais-stats>
    <template
      #default="{ nbHits }"
    >
      <h3
        id="results"
        class="font-semibold text-2xl mb-6"
        data-cy="number-of-books"
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
