<script>
    import { BASE_URL } from "../../stores/urlDomain";
    import { user, mail, role } from "../../stores/user.js";
    import { Link } from "svelte-navigator";
    import toastr from "toastr";
    import 'toastr/build/toastr.css';

    async function handleLogout() {
        const logoutURL = $BASE_URL+ "/auth/logout";
        console.log(logoutURL);
        
        const logoutResponse = await fetch(logoutURL, {
            credentials: "include"
        });

        const data = await logoutResponse.json();
        console.log(data);
        
        $user = null;
        $mail = null;
        $role = null;
        toastr.info(`BYE BYE`);
    }
</script>

<Link to="/" on:click={handleLogout}> Log out </Link>
