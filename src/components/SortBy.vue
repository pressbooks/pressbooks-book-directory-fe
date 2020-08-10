<template>
  <ais-sort-by
      :items="[
        { value: 'test_Pressbooks_directory', label: 'Name (desc.)' },
        { value: 'test_Pressbooks_directory_sort_by_wordCount', label: 'Word count (asc.)' },
        { value: 'test_Pressbooks_directory_sort_by_lastUpdated', label: 'Updated (desc.)' }
      ]"
  />
</template>

<script>
export default {
    name: 'SortBy'
}
</script>