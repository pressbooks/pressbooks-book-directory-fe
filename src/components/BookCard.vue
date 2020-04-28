<template>
    <ais-hits>
        <div slot="item" slot-scope="{ item, index }">
            {{ index }} - {{ item.name }}
        </div>
    </ais-hits>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    };
</script>