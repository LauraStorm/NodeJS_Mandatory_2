<script>
    import { useLocation, useNavigate } from "svelte-navigator";
    import { user } from "../../stores/user";

    //export let params;
    export let navigate = useNavigate();
    export let location = useLocation();

    $: if (!$user){
        navigate("/login", {
            state: { from: $location.pathname },
            replace: true
        });
    }
</script>

<slot/>
