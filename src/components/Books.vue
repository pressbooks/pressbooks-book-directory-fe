<template>
    <ais-hits :transform-items="transformItems">
        <div class="books" slot-scope="{ query, items }">
            <p class="books-no-results" v-if="items.length === 0">
                No results found matching <strong>{{ query }}</strong
            >.
            </p>
            <v-row dense>
                <v-col v-for="item in items" :key="item.objectID" cols="12">
                    <book-card :item="item"></book-card>
                </v-col>
            </v-row>
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
                        typeof item.author === "object"
                            ? item.author.join(", ")
                            : item.author,
                    editorNames:
                        item.has_editor && typeof item.editor === "object"
                            ? item.editor.join(", ")
                            : item.editor,
                    image: item.image
                        ? item.image
                        : vm.imagesPath + "no-image-available.png",
                    publisherName: item.publisher_name ? item.publisher_name : false,
                    lang: item.inLanguage ? item.inLanguage.toUpperCase() : false,
                    description: item.description
                        ? vm.removeXMLTags(item.description)
                        : false,
                    licenseIcon: item.license_name
                        ? vm.getLicenseIcon(item.license_name).image
                        : false,
                    licenseAlt: item.license_name
                        ? vm.getLicenseIcon(item.license_name).alt
                        : false,
                    isBasedOn: item.isBasedOn !== undefined,
                    subject: item.subject !== undefined ? item.subject : false,
                    word_count: item.word_count !== undefined ? item.word_count : false
                }));
            },
            getLicenseIcon(license) {
                var img = {
                    image:
                        this.$store.state.config.imagesPath +
                        "licenses/" +
                        this.$store.state.config.licenseIcons["public-domain"].image,
                    alt: this.$store.state.config.licenseIcons["public-domain"].alt
                };
                var lic = license
                    .toLowerCase()
                    .split(" ")
                    .join("-");
                for (const key in this.$store.state.config.licenseIcons) {
                    if (lic == key) {
                        return {
                            image:
                                this.$store.state.config.imagesPath +
                                "licenses/" +
                                this.$store.state.config.licenseIcons[key].image,
                            alt: this.$store.state.config.licenseIcons[key].alt
                        };
                    }
                }
                return img;
            },
            removeXMLTags(string) {
                return string.replace(/<[^>]*>/g, "");
            }
        }
    }
</script>

<style scoped>

</style>