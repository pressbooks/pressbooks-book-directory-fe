<template>
  <ais-stats>
    <template
      #default="{ nbHits }"
    >
      <div
        class="font-semibold text-2xl mb-6"
        data-cy="number-of-books"
      >
        Results:  {{ $filters.numberFormat(nbHits) }} books
      </div>
    </template>
  </ais-stats>
</template>

<script>
export default {
  name: 'PbStats'
};
</script>
