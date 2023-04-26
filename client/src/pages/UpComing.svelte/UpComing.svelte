<script>
    import {BASE_URL} from "../../stores/urlDomain.js";
    import { onMount } from "svelte";

    let newMovies = [];

    onMount(async()=> {
        const response = await fetch($BASE_URL+"/upComing", {
            credentials: "include"
        });
        const { data: upComingMovies} = await response.json();
        newMovies = upComingMovies;

    });

</script>

<h3>Upcoming Movies</h3>
<h5>Overview of upcoming movies</h5>

<div class="movies">
    {#each newMovies as movie }
        <div class="movies-box">
            <h5>{movie.movie_name}</h5>
        </div>
    {/each}
</div>

<style>
    .movies{
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* 2 columns */
        grid-template-rows: auto auto; /* 2 rows */
        grid-gap: 1em;
    }

    .movies-box {
        display: flex;
        justify-content: center; /* center content horizontally */

        align-items: center; 
        background-color: #8a2be212;
        padding: 1em;
        margin: 2% 0%;       
    }
</style>