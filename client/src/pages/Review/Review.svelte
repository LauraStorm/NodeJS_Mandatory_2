<script>
    import { reviews } from "../../stores/reviews.js";
    import { user, mail } from "../../stores/user.js";
    import toastr from "toastr";
    import 'toastr/build/toastr.css';

    toastr.options = {
        "positionClass": "toast-top-center",
        "timeOut": "2000"
    } 

    $: username = $user;
    $: email = $mail;

    let movieTitle = "";
    let reviewMessage = "";

    function handleCreateMovieReview (){
        reviews.update((currentMovieReview) => {
            const createdReview = { title: movieTitle, review: reviewMessage,  fromUser: username, fromEmail: email , handled: false };
            console.log(createdReview);
            currentMovieReview.push(createdReview);
            toastr.success("Thanks, your review is send");
            return currentMovieReview;
        });

        movieTitle = "";
        reviewMessage = "";
    }
</script>

<h3>Write a review </h3>
<h5>We would love to here your experience</h5>

<label for="movieTitle">The movies title:</label> <br>
<input type="text" name="movieTitle" required bind:value={movieTitle}> <br><br>

<label for="reviewMessage">Write review:</label> <br>
<textarea name="reviewMessage" required bind:value={reviewMessage}></textarea> <br><br>


<button on:click={handleCreateMovieReview}>Send Movie Review</button>

<style>
    textarea {
        width: 60%;
        height: 20em;
    }
</style>
