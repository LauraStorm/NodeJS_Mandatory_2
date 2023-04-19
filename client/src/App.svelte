<script>
  import { Router, Route, Link } from "svelte-navigator";
  import Login from "./routes/Login.svelte";
  import PrivateRoute from "./components/routing/PrivateRoute.svelte";
  import { user } from "./store/user.js"
  import Home from "./routes/Home.svelte";
  import SignUp from "./routes/SignUp.svelte";
  import Contact from "./routes/Contact.svelte";
  import AccessError from "./routes/AccessError.svelte";
  import Logout from "./routes/Logout.svelte";
    
  $: isAuthenticated = $user; 

</script>


<Router>
  <header>
    {#if isAuthenticated}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Logout/>
      </nav>
    {:else}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/signup">Sign up</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    {/if}
  </header>
  
  <main>
    <!--
      Public routes
    -->
    <Route path="/" component={Home}></Route>
    <Route path="/login" component={Login}></Route>
    <Route path="/signup" component={SignUp}></Route>
    <Route path="/access-error" component={AccessError}></Route>
    

    <!--
      Private routes
    -->

    <PrivateRoute path="/contact" let:location>
      <Contact/>
    </PrivateRoute>
   
  </main>


</Router>

<style>

</style>