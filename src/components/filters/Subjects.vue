<template>
    <v-list-group value="true">
        <template v-slot:activator>
            <v-list-item-title>SUBJECT</v-list-item-title>
        </template>
        <ais-refinement-list
            attribute="about"
            :searchable="false"
            operator="or"
        >
            <div slot-scope="{ items }">
                <v-list-item
                    v-for="item in items"
                    :key="item.value"
                    @click.prevent="applyFilters(item.value, 'about')"
                >
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.value }} ({{ item.count }})
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </div>
        </ais-refinement-list>
    </v-list-group>
</template>

<script>
    export default {
        name: "Subjects",
        methods: {
            applyFilters(value, attribute, operator = ":") {
                this.$store.commit("setFiltersApplied", {
                    value: value,
                    attribute: attribute,
                    operator: operator
                });
                this.$store.dispatch("refreshFilters");
            }
        }
    }
</script>

<style scoped>

</style>