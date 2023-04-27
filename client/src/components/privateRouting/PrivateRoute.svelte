<script>
    import { Route } from "svelte-navigator";
    import PrivateRouteGuard from "./PrivateRouteGuard.svelte";
    
    export let path; 
    let navigate;
    let location;
</script>

<Route {path}>
    <PrivateRouteGuard {location} {navigate}>
        <slot/>
    </PrivateRouteGuard>
</Route>
