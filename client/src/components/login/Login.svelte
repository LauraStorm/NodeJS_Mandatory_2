<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../store/urlDomain.js";
    
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
        });
        const data = await loginResponse.json();
        console.log(data);
        
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

<style>

</style>