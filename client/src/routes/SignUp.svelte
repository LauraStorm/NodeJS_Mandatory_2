<script>
    import { BASE_URL } from "../store/urlDomain.js";
    import { useNavigate, useLocation } from "svelte-navigator";
    import toastr from "toastr";
    import 'toastr/build/toastr.css';

    toastr.options ={
        "positionClass": "toast-top-center",
        "timeOut": "2000"
    }

    const navigate = useNavigate();

    // extracts 
    let baseURL = "";
    BASE_URL.subscribe(value => {
        baseURL = value;
    });

    let username = ""; 
    let password = ""; 
    let email = ""; 

    
    async function handleSignUp (){
        const userToJSON = JSON.stringify({username, password, email}) 
        
        // post til backend 
        const signupURL =`${baseURL}/signup`;
        console.log(signupURL);
        
        const signupResponse = await fetch(signupURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: userToJSON,
            credentials:"include"
        });

        const data = await signupResponse.json();
        console.log(data);

        if (data.newUser.username === username){
            toastr["success"]("Created successfully! ")
        } 

        // **** mangler at lave hvis user eksisterer

        navigate("/login", {
            replace: true
        });
        
        username = ""; 
        password = ""; 
        email = ""; 
    }



</script>
<h3>Sign up Page</h3>

<form on:submit|preventDefault={handleSignUp}>
    <label for="username">Username</label>
    <input type="text" placeholder="write username" name="username" required bind:value={username}>

    <label for="password">Password</label>
    <input type="password" placeholder="write password" name="password" required bind:value={password}>

    <label for="email">Email</label>
    <input type="email" placeholder="write email" name="email" required bind:value={email}>

    <button type="submit"> Sign up</button>
</form>
