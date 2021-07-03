<template>
  <ais-stats>
    <template
      #default="{ nbHits }"
    >
      <div
        class="font-semibold text-2xl mb-6"
        data-cy="number-of-books"
      >
        Results:  {{ nbHits | numberFormat }} books
      </div>
    </template>
  </ais-stats>
</template>

<script>
export default {
  name: 'PbStats'
};
</script>