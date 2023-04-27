<script>
    import { movieReviews } from "../../stores/movieReviews";

    function handleDeleteReviews (){
        movieReviews.update( reviews => reviews.filter(review => !review.handled));
    }
</script>

<h3>Movie Reviews </h3>
<h5>All reviews</h5>

<div class="reviews">
    {#each $movieReviews as review }
        <div class:handled={review.handled} class="review-box">
            <p><b>From: </b>{review.fromUser}</p>
            <p><b>Title: </b>{review.title}</p>
            <p><b>Review: </b><br>{review.review}</p>
            <hr>
            <p><b></b>Delete review: <input type="checkbox" bind:checked={review.handled}> </p>
        </div>
    {/each}
    
    <br><br>
    <button on:click={handleDeleteReviews}>Delete selected reviews</button>
</div>

<style>
    .handled{
        opacity: 60%;
    }
    
    .review-box{
        background-color: #8a2be212;
        padding: 1em;
        margin: 2% 0%;
    }
</style>
