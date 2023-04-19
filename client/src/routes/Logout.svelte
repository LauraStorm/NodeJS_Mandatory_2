<script>
    import { BASE_URL } from "../store/urlDomain";
    import { user } from "../store/user.js";
    import { Link } from "svelte-navigator";
    import toastr from "toastr";
    import 'toastr/build/toastr.css';

    // extracts 
    let baseURL = "";
        BASE_URL.subscribe(value => {
        baseURL = value;
    });

    async function handleLogout() {
        const logoutURL =`${baseURL}/auth/logout`;
        console.log(logoutURL);
        
        const logoutResponse = await fetch(logoutURL, {
            credentials: "include"
        });

        const data = await logoutResponse.json();
        console.log(data);
        
        $user = null;
        //suceess
        toastr["info"](`BYE BYE`);
    }
</script>

<Link to="/" on:click={handleLogout}> Log out </Link>
