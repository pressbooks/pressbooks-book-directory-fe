<template>
    <section>
        <div
            class="book-image"
            :style="`background-image: url('${item.image}');`"
        ></div>
        <div class="book-data">
            <div class="book-icons book-data-row">
                <div
                        class="book-language book-icons-row"
                        v-if="item.lang"
                        @click="applyFilters(item, 'inLanguage')"
                >
                    {{ item.lang }}
                </div>
                <div class="book-license book-icons-row">
                    <img
                            :src="item.licenseIcon"
                            :title="item.licenseAlt"
                            class="book-img-icons"
                            v-if="item.licenseIcon"
                            @click="applyFilters(item, 'license_name')"
                    />
                </div>
                <div class="book-isclone book-img-icons">
                    <img
                            :src="baseIcon(item.isBasedOn).img"
                            :title="baseIcon(item.isBasedOn).alt"
                            class="book-img-icons"
                            @click="applyFilters(item, 'isBasedOn')"
                    />
                </div>
            </div>
            <div class="book-data-row">
                <div class="book-title">
                    {{ item.name }}
                </div>
                <div class="book-details">
                    <div class="book-data-details-row">
                        <strong>Author(s): </strong>
                        <span
                                v-for="(author, index) in item.author"
                                v-bind:key="index"
                        >
                            <span v-if="index != 0">, </span>
                            <span
                                    class="cursor-pointer"
                                    @click="applyFilters(item, 'author', index)"
                            >
                              {{ author }}
                            </span>
                          </span>
                    </div>
                    <div
                            class="book-data-row"
                            v-if="item.editor && item.editor.length > 0"
                    >
                        <strong>Editor(s): </strong>
                        <span
                                v-for="(editor, index) in item.editor"
                                v-bind:key="index"
                                s
                                a
                        >
                            <span v-if="index != 0">, </span>
                            <span
                                    class="cursor-pointer"
                                    @click="applyFilters(item, 'editor', index)"
                            >
                              {{ editor }}
                            </span>
                          </span>
                    </div>
                    <div class="book-details-row" v-if="item.subject">
                        <strong>Subject(s): </strong> {{ item.subject }}
                    </div>
                    <div
                            v-if="item.publisher_name"
                            @click="applyFilters(item, 'publisher_name')"
                    >
                        <strong>Publisher: </strong>
                        <span class="book-details-row cursor-pointer">{{
                            item.publisherName
                          }}</span>
                    </div>
                    <div class="book-details-row" v-if="item.word_count">
                        <strong>Word Count: </strong> {{ item.word_count }}
                    </div>
                    <div class="book-details-row" v-if="item.description">
                        <strong>Description: </strong> {{ item.description }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import "../App.css";

    export default {
        name: "book-card",
        props: ['item'],
        methods: {
            applyFilters(item, attribute, index = null) {
                if (this.$store.state.SClient.filtersAllowed[attribute] === undefined) {
                    return;
                }
                let toString = "";
                let typeVar = this.$store.state.SClient.filtersAllowed[attribute].type;
                let attr = attribute,
                    value;

                if (index !== null) {
                    value = item[attr][index];
                } else {
                    value = item[attr];
                }

                switch (typeVar) {
                    case "boolean":
                        if (item[attribute]) {
                            toString = this.$store.state.SClient.filtersAllowed[attr].trueValue;
                            attr = this.$store.state.SClient.filtersAllowed[attr].trueAttribute;
                            value = true;
                        } else {
                            toString = this.$store.state.SClient.filtersAllowed[attr].falseValue;
                            attribute = this.$store.state.SClient.filtersAllowed[attr].falseAttribute;
                            value = false;
                        }
                        break;
                    default:
                        toString = attr + ':"' + value + '"';
                        break;
                }
                if (this.$store.state.SClient.searchParameters.filters.length == 0) {
                    this.$store.state.SClient.searchParameters.filters = toString;
                } else {
                    this.$store.state.SClient.searchParameters.filters += " AND " + toString;
                }
                this.$store.state.SClient.filters.push({
                    attribute: attr,
                    value: value
                });
            },
            baseIcon(isBasedOn) {
                return {
                    img: isBasedOn
                        ? this.$store.state.config.imagesPath + "is-child.png"
                        : this.$store.state.config.imagesPath + "is-base.png",
                    alt: isBasedOn ? "Based on other book" : "Is not based on another book"
                };
            },
        },
        data() {
            return {

            };
        }
    }
</script>