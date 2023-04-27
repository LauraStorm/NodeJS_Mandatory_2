<script>
    import { BASE_URL } from "../../stores/urlDomain";
    import { user, mail, role } from "../../stores/user.js";
    import { Link } from "svelte-navigator";
    import toastr from "toastr";
    import 'toastr/build/toastr.css';

    async function handleLogout() {

        await fetch($BASE_URL+ "/auth/logout", {
            credentials: "include"
        });

        $user = null;
        $mail = null;
        $role = null;
        
        toastr.info(`BYE BYE`);
    }
</script>

<Link to="/" on:click={handleLogout}> Log out </Link>
