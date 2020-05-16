<template>
    <div class="input-group mb-3">
        <div class="properties-filter">
            <div class="license-filter">
                <h6>Licenses</h6>
                <ais-refinement-list
                    attribute="license_name"
                    :searchable="false"
                    operator="or"
                >
                    <div
                        slot-scope="{ items, refine }"
                    >
                        <div class="form-group">
                            <select multiple class="form-control" v-model="licenses">
                                <option
                                    v-for="item in items"
                                    :key="item.value"
                                    @click="setLicenses()"
                                    :value="item.value"
                                >
                                    {{ item.value }} - {{ item.count.toLocaleString() }}
                                </option>
                            </select>
                        </div>
                    </div>
                </ais-refinement-list>
            </div>
            <div class="properties-input-filters">
                <h6>Based on</h6>
                <div class="form-check">
                    <input
                        type="radio"
                        name="isbased"
                        @click.prevent="applyFilters(true, 'has_isBasedOn', 1)"
                        class="form-check-input"
                        id="is-basedon"
                        value="true"
                        :checked="isBasedOn == 1"
                    >
                    <label class="form-check-label" for="is-basedon" @click.prevent="applyFilters(true, 'has_isBasedOn', 1)">
                        Based on another book
                    </label>
                </div>
                <div class="form-check">
                    <input
                        type="radio"
                        name="isbased"
                        @click.prevent="applyFilters(false, 'has_isBasedOn', 2)"
                        class="form-check-input"
                        id="no-basedon"
                        value="false"
                        :checked="isBasedOn == 2"
                    />
                    <label class="form-check-label" for="no-basedon" @click.prevent="applyFilters(false, 'has_isBasedOn', 2)">
                        Original
                    </label>
                </div>
                <div class="form-check">
                    <input
                        type="radio"
                        name="isbased"
                        @click.prevent="applyFilters(null, 'has_isBasedOn', 3)"
                        class="form-check-input"
                        id="no-basedon"
                        value="false"
                        :checked="isBasedOn == 3"
                    />
                    <label class="form-check-label" for="no-basedon" @click.prevent="applyFilters(null, 'has_isBasedOn', 3)">
                        Any
                    </label>
                </div>
            </div>
            <div class="properties-number-filters">
                <h6>Word Count</h6>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "book-properties",
    methods: {
        applyFilters(value, attribute, option = null, comparator = ':') {
            if (option !== null) {
                this.isBasedOn = option;
            }
            if (value === null) {
                delete this.$store.state.SClient.filtersApplied.has_isBasedOn;
            } else {
                if (
                    attribute === 'has_isBasedOn' &&
                    this.$store.state.SClient.filtersApplied.has_isBasedOn !== undefined
                ) {
                    delete this.$store.state.SClient.filtersApplied.has_isBasedOn;
                }
                this.$store.commit('setFiltersApplied', {value: value, attribute: attribute, comparator: comparator});
            }
        },
        setLicenses() {
            delete this.$store.state.SClient.filtersApplied.license_name;
            this.licenses.forEach(l => {
                this.$store.commit('setFiltersApplied', {value: l, attribute: 'license_name', comparator: ':'});
            });
        },
        formatMinValue(minValue, minRange) {
            return minValue !== null && minValue !== minRange ? minValue : '';
        },
        formatMaxValue(maxValue, maxRange) {
            return maxValue !== null && maxValue !== maxRange ? maxValue : '';
        },
        applyWordCountFilter(range) {
            delete this.$store.state.SClient.filtersApplied.wordCount;
        }
    },
    data() {
        return {
            isBasedOn: 3,
            licenses: [],
            wordCount: {
                from: 1000,
                to: null
            }
        };
    }
};
</script>