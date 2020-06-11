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
            <v-list-item
                slot="item"
                slot-scope="{ item, refine }"
                :class="item.isRefined ? 'red lighten-1' : ''"
            >
                <v-list-item-action @click.prevent="refine(item.value)">
                    <v-checkbox
                        color="white"
                        v-model="item.isRefined"
                        :label="cleanLicense(item)"
                    ></v-checkbox>
                </v-list-item-action>
            </v-list-item>
        </ais-refinement-list>
    </v-list-group>
</template>

<script>
    export default {
        name: "Licenses",
        data() {
            return {
                selected: []
            };
        },
        methods: {
            check(isRefined) {
                return isRefined;
            },
            cleanLicense(item) {
                let parts = item.value.split(' (');
                if(parts.length > 1) {
                    return parts[0] + ' (' + item.count + ')';
                }
                return item.value + ' (' + item.count + ')';
            }
        }
    }
</script>

<style scoped>

</style>