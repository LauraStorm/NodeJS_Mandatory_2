<script>
    import { navigate, useLocation } from "svelte-navigator";
    import { user } from "../../store/user";


    const location = useLocation();

    $: if (!$user){
        navigate("/login", {
            state: { from: $location.pathname },
            replace: true
        });
    }

    /*const navigateToLogin = () => {
        navigate("/login", {
            state: { from: $location.pathname },
            replace: true
        });
    }

    $: if (!$user){
        navigateToLogin();
    } */
</script>

<slot/>