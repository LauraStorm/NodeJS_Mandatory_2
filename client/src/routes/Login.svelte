<script>
    import { BASE_URL } from "../store/urlDomain.js";
    import { user } from "../store/user.js";
    import { useNavigate, useLocation } from "svelte-navigator";
    import toastr from "toastr";
    import 'toastr/build/toastr.css';
    
    const navigate = useNavigate();
    
    toastr.options ={
        "positionClass": "toast-top-center",
        "timeOut": "2000"
    }
   
    // extracts 
    let baseURL = "";
    BASE_URL.subscribe(value => {
        baseURL = value;
    });
    
    let username = "";
    let password = "";

    async function validateLogin (){
        const userToJSON = JSON.stringify({username, password}) 
        
        // post til backend 
        const loginURL =`${baseURL}/auth/login`;
        console.log(loginURL);
        
        const loginResponse = await fetch(loginURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: userToJSON,
            credentials:"include"
        });

        const data = await loginResponse.json();
        console.log(data);

        
        if (data.username === username){
            const authenticatedUser = data.username;
            console.log("Authenticated user is set: ",authenticatedUser);
            user.set(authenticatedUser);
            //suceess
            toastr["success"](`Successe - Welcome back ${authenticatedUser}`);
            setTimeout( () => {
                navigate("/contact", {replace:true});
            },2000);
            
        } else {
            // error
            toastr["error"](`Sorry - ${data.message}`);
            setTimeout( () => {
               navigate("/contact", {replace:true});
            },2000);
            
        }
        

        // Reset form
        username = "";
        password = "";
    }
   
    
</script>


<h3>Login </h3>
<form on:submit|preventDefault={validateLogin}>

    <label for="username">Username:</label> 
    <input type="text" placeholder="Write your password here" name="username" bind:value={username} required>

    <label for="password">Password:</label>
    <input type="password" placeholder="Write your password here" name="password" bind:value={password} required>

    <button type=submit > Login </button>
    
</form>



