<script context="module">
    export const load = async ({session}) => {
        if (!session?.user) {
            return {
                status: 302,
                redirect: "/sign-in"
            }
        }
        return {
            props: {
            }
        }
    }
</script>
<script>
    import { getContext } from "svelte";
    import { session } from "$app/stores";

    const directus = getContext('directus')

    console.log('sign out directus', directus)

    async function handleSignOut() {
    console.log('handleSignOut click')
    await directus.auth.logout()

    await fetch("/api/sign-out")

    window.location = "/";
    }

</script>
{#if $session.user}
     User : {JSON.stringify($session.user)}
{:else}
     No user
{/if}
<h3>Page déconnexion</h3>
<button on:click={handleSignOut}>Se déconnecter</button>