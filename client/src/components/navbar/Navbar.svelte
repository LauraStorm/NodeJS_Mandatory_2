<script>
  import { Link } from "svelte-navigator";
  import { user, role } from "../../stores/user.js"
  import Logout from "../Logout/Logout.svelte";
  
  $: roleType = $role;
  $: username = $user; 
</script>

<header>
    <div class="navbar">
      <div class="nav-links">
        {#if roleType === 1}
          <nav>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/movies">Movies to watch</Link>
            <Link to="/seeReviews">Movie Reviews</Link>
            <Link to="/upComing">Upcoming Movies</Link>
            <Logout/>
          </nav>
        {:else if roleType === 2}
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/benefits">Benefits</Link>
          <Logout/>
        {:else if roleType === 3}
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/review">Write Review</Link>
          <Logout/>
        {:else}
          <nav>
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/signup">Sign up</Link>
            <Link to="/profile">Profile</Link>
          </nav>
        {/if}
      </div>
      <div class="nav-login-info">
        {#if username}
          <h3>Welcome: {username}</h3>
        {:else}
          <h3>Movies 🍿</h3>
        {/if}
      </div>
    </div>
</header>

<style>
  .navbar{
    background-color: rgba(107, 98, 239, 0.406);
    display: flex;
    justify-content: space-between;
    height: auto;
    padding: 1em 2em;
  }

  .nav-links {
    display: flex;
    align-items: center;  
    width: 75%;  
  }
</style>
