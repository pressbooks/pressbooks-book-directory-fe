<template>
    <v-list-group
        value="true"
    >
        <template v-slot:activator>
            <v-list-item-title>LICENSE</v-list-item-title>
        </template>
        <ais-refinement-list
            attribute="license_name"
            :searchable="false"
            operator="or"
        >
            <div slot-scope="{ items }">
                <v-list-item
                    v-for="item in items"
                    :key="item.value"
                    @click.prevent="applyFilters(item.value, 'license_name')"
                >
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ cleanLicense(item) }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </div>
        </ais-refinement-list>
    </v-list-group>
</template>

<script>
    export default {
        name: "Licenses",
        methods: {
            cleanLicense(item) {
                let parts = item.value.split(' (');
                if(parts.length > 1) {
                    return parts[0] + ' (' + item.count + ')';
                }
                return item.value + ' (' + item.count + ')';
            },
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