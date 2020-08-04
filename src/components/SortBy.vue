<template>
  <ais-sort-by
      :items="[
        { value: 'test_Pressbooks_directory', label: 'Name (desc)' },
        { value: 'test_Pressbooks_directory_sort_by_wordCount', label: 'Word count asc.' }
      ]"
  />
</template>

<script>
export default {
    name: 'SortBy'
}
</script>