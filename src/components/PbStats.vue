<template>
  <ais-stats>
    <template
      #default="{ nbHits }"
    >
      <div class="font-semibold text-2xl mb-8">
        Results:  {{ nbHits }} books
      </div>
    </template>
  </ais-stats>
</template>

<script>
export default {
  name: 'PbStats'
};
</script>