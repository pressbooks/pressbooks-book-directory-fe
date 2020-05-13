import algoliasearch from "algoliasearch/lite";

let sClient = {
    searchClient: algoliasearch(
        process.env.VUE_APP_ALGOLIA_APP_ID,
        process.env.VUE_APP_ALGOLIA_API_READ_KEY
    ),
    indexName: process.env.VUE_APP_ALGOLIA_INDEX,
    filters: [],
    searchParameters: {
        hitsPerPage: 10,
        filters: "",
        facets: [
            "isBasedOn",
            "has_isBasedOn",
            "license_name",
            "inLanguage",
            "publisher_name",
            "author",
            "editor"
        ],
        disjunctiveFacets: [
            "isBasedOn",
            "has_isBasedOn",
            "license_name",
            "inLanguage",
            "publisher_name",
            "author",
            "editor"
        ]
    },
    filtersAllowed: {
        license_name: {
            type: "string"
        },
        inLanguage: {
            type: "string"
        },
        has_isBasedOn: {
            type: "boolean"
        },
        publisher_name: {
            type: "string"
        },
        editor: {
            type: "string"
        },
    }
}

export default {
    state: sClient
}