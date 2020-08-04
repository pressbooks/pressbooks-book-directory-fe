<template>
    <ais-hits-per-page
        :items="[
            { label: '10 books per page', value: 10, default: true },
            { label: '20 books per page', value: 20 },
            { label: '50 books per page', value: 50 },
        ]"
    />
</template>

<script>
export default {
  name: 'PerPage'
}
</script>