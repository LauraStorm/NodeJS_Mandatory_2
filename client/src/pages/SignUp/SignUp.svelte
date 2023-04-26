<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { navigate } from "svelte-navigator";
    import toastr from "toastr";
    import 'toastr/build/toastr.css';
   
    toastr.options ={
        "positionClass": "toast-top-center",
        "timeOut": "2000"
    }

    let username = ""; 
    let password = ""; 
    let email = ""; 

    async function handleSignUp (){
        const userToJSON = JSON.stringify({username, password, email}); 
        
        // post til backend 
        const signupURL = $BASE_URL + "/signup";
        console.log(signupURL);
        
        const signupResponse = await fetch(signupURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: userToJSON,
            credentials:"include"
        });

        const data  = await signupResponse.json();
     
        if (data.message === username){
            toastr.success("User Successfully created. Welcome " + data.message);
        } else if (data.message === "Failed") {
            toastr.error("You already have an account!");
        } else {
            toastr.error("Error creating user");
        }
        
        navigate("/login", {
            replace: true
        });
        
        username = ""; 
        password = ""; 
        email = ""; 
    }

</script>

<h3>Sign up Page</h3>

<form on:submit|preventDefault={handleSignUp} class="form">

    <div class="box">
        <label for="username">Username</label><br>
        <input type="text" placeholder="write username" name="username" required bind:value={username}>
    </div>
    
    <div class="box">
        <label for="password">Password</label><br>
        <input type="password" placeholder="write password" name="password" required bind:value={password}>
    </div>

    <div class="box">
        <label for="email">Email</label> <br>
        <input type="email" placeholder="write email" name="email" required bind:value={email}>
    </div>
    
    <div class="box">
        <button type="submit">Sign up</button>
    </div>
    
</form>


<style>
    .form {
        border: 0.3em solid #c1272d;
        width: 40em;
    }

    .box {
        display: flex;
        flex-direction: column;
        margin: 1em 1em;
       
    }
    input {
        height: 2em;
        border-radius: 5px;
    }

    label {
      font-weight: bold;
    }
  
</style>