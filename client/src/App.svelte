<script>
  import { Router, Route } from "svelte-navigator";
  import PrivateRoute from "./components/privateRouting/PrivateRoute.svelte";
  import Navbar from "./components/navbar/Navbar.svelte";
  import Home from "./pages/Home/Home.svelte";
  import Profile from "./pages/Profile/Profile.svelte";
  import Login from "./pages/Login/Login.svelte";
  import SignUp from "./pages/SignUp/SignUp.svelte";
  import Review from "./pages/Review/Review.svelte";
  import SeeReviews from "./pages/SeeReview/SeeReviews.svelte";
  import Movies from "./pages/Movies/Movies.svelte";
  import UpComing from "./pages/UpComing.svelte/UpComing.svelte";
  import Benefits from "./pages/Benefits/Benefits.svelte";
  
</script>


<Router>
  <Navbar/>

  <main>
    <!-- Public routes-->
    <Route path="/" component={Home}></Route>
    <Route path="/login" component={Login}></Route>
    <Route path="/signup" component={SignUp}></Route>
    <Route path="/movies" component={Movies}></Route>

    <!-- Private routes-->
    <PrivateRoute path="/profile">
      <Profile/>
    </PrivateRoute>


    <!-- Admin: Private routes-->
    <PrivateRoute path="/seeReviews">
      <SeeReviews/>
    </PrivateRoute>

    <PrivateRoute path="/upComing">
      <UpComing/>
    </PrivateRoute>

    <!-- User: Private routes-->
    <PrivateRoute path="/benefits">
      <Benefits/>
    </PrivateRoute>

    <!-- Guest: Private routes-->
     <PrivateRoute path="/review">
      <Review/>
    </PrivateRoute>
    
  </main>
</Router>
