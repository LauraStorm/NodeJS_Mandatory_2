import { writable } from "svelte/store";

export const reviews = writable([
    { title: "Kagemanden Kommer", review: "Virkelig underholdende - børnene var glade.... Men gal jeg blev lækkersulten. HUSK SNACKS!!! ",  fromUser: "KarenMaren", fromEmail: "karen@karen.dk" , handled: false }
]);