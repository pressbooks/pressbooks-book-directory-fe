<template>
    <ais-hits :transform-items="transformItems">
        <div class="ais-Hits__books" slot-scope="{ query, items }">
            <p class="books-no-results" v-if="items.length === 0">
                No results found matching <strong>{{ query }}</strong
            >.
            </p>
            <div class="ais-Hits__books__container" v-for="item in items" :key="item.objectID">
                <book-card :item="item"></book-card>
            </div>
        </div>
    </ais-hits>
</template>

<script>
    import BookCard from "./bookcard/BookCard.vue";
    export default {
        name: "Books",
        components: {
            BookCard
        },
        methods: {
            transformItems(items) {
                let vm = this;
                return items.map(item => ({
                    ...item,
                    authorNames:
                        typeof item.author === "object" && item.author !== null
                            ? item.author.join(", ")
                            : item.author,
                    editorNames:
                        item.has_editor && typeof item.editor === "object"
                            ? item.editor.join(", ")
                            : item.editor,
                    image: item.image
                        ? item.image
                        : vm.$store.state.config.imagesPath + vm.$store.state.config.defaultBookCover,
                    publisherName: item.publisher_name ? item.publisher_name : false,
                    lang: item.inLanguage ? item.inLanguage.toUpperCase() : false,
                    description: item.description
                        ? vm.removeXMLTags(item.description)
                        : false,
                    licenseIcon: item.license_name
                        ? vm.getLicenseIcon(item).image
                        : false,
                    licenseAlt: item.license_name
                        ? vm.getLicenseIcon(item).alt
                        : false,
                    isBasedOn: item.isBasedOn !== undefined,
                    subject: item.subject !== undefined ? item.subject : false,
                    word_count: item.word_count !== undefined ? item.word_count : false
                }));
            },
            getLicenseIcon(item) {
                if (item.license_name !== undefined) {
                    let license = item.license_name;
                    let img = {
                        image:
                            this.$store.state.config.imagesPath +
                            "licenses/" +
                            this.$store.state.config.licenseIcons["public-domain"].image,
                        alt: this.$store.state.config.licenseIcons["public-domain"].alt
                    };
                    let lic = license
                        .toLowerCase()
                        .split(" ")
                        .join("-");
                    for (const key in this.$store.state.config.licenseIcons) {
                        if (lic == key) {
                            img = {
                                image: this.$store.state.config.imagesPath + "licenses/" + this.$store.state.config.licenseIcons[key].image,
                                alt: this.$store.state.config.licenseIcons[key].alt
                            };
                        }
                    }
                    return img;
                }
                return {image: false, alt: false};
            },
            removeXMLTags(string) {
                return string.replace(/<[^>]*>/g, "");
            }
        }
    }
</script>
