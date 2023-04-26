<script>
    import { BASE_URL } from "../../stores/urlDomain.js";
    import { user, mail, role } from "../../stores/user.js";
    import { navigate } from "svelte-navigator";
    import toastr from "toastr";
    import 'toastr/build/toastr.css';

    toastr.options = {
        "positionClass": "toast-top-center",
        "timeOut": "2000"
    }

    let email = "";
    let password = "";

    async function validateLogin (){
        const userToJSON = JSON.stringify({email, password}) 

        const loginURL = $BASE_URL + "/auth/login";
        
        const loginResponse = await fetch(loginURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: userToJSON,
            credentials:"include"
        });

        const data = await loginResponse.json();

        if (data.email === email){
            const validUser = data.username;
            const ValidEmail = data.email;
            const validRole = data.role;

            $user = validUser;
            $mail = ValidEmail;
            $role = validRole;

            console.log("Authenticated user is set: ", validUser);
            toastr.success(`Success - Welcome back ${validUser}`);

            setTimeout( () => {
                navigate("/profile", {replace:true});
            },1000);
            
        } else {
            // error
            toastr.error("Sorry wrong data. Try again"); 
        }
        // Reset form
        email = "";
        password = "";
    }
    
</script>

<h3>Login </h3>
<form on:submit|preventDefault={validateLogin} class="login-form">

    <div class="box">
        <label for="email">Email:</label> <br>
        <input type="email" placeholder="Enter email here" name="email" bind:value={email} required>
    </div>
    
    <div class="box">
        <label for="password">Password:</label> <br>
        <input type="password" placeholder="Enter password here" name="password" bind:value={password} required>
    </div>
    
    <div class="box">
        <button type=submit > Login </button>  
    </div>
</form>

<style>
    .login-form {
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
