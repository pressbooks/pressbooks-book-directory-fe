<template>
  <ais-stats>
    <template
      #default="{ nbHits, query }"
    >
      <h3
        id="results"
        class="font-semibold text-2xl mb-6"
        data-cy="number-of-books"
      >
        {{ `${$filters.numberFormat(nbHits)} results ${query ? `for "${query}"` : ''}` }}
      </h3>
    </template>
  </ais-stats>
</template>

<script>
export default {
  name: 'PbStats'
};
</script>
