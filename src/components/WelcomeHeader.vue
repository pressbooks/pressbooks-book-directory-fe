<template>
    <div class="headerwelcome grey lighten-3">
        <v-container align="center" class="headerwelcome_content">
            <p class="display-3 font-weight-bold headerwelcome_red-font-pressbooks">Welcome to Pressbooks Directory</p>
            <p class="headerwelcome_spectral-front font-italic">
                This site presents a searchable, filterable directory of <strong>{{ $store.state.stats.totalBooks }} </strong>
                public books published across
                <strong>{{ $store.state.stats.totalNetworks }}</strong> Pressbooks
                networks (see full list [link]).
                You can find books of interest by searching the full text of all metadata, applying one or more filters,
                or simply browsing the book cards below. [More details about using the site.]
            </p>
            <searchbox></searchbox>
        </v-container>
    </div>
</template>

<script>
    import Searchbox from "./Searchbox";
    export default {
        name: "WelcomeHeader",
        components: {Searchbox}
    }
</script>