<script context="module">
    export const load = async ({session}) => {
        let isAuthenticated = false
        if (session?.user) {
            console.log('ML current user ok')
            isAuthenticated = session.user.authenticated
            return {
                props: {
                    isAuthenticated
                }
            }
        }
        return {
            props: {
                isAuthenticated
            }
        }
    }
</script>
<script>
    import { setContext } from 'svelte';
    import {session} from '$app/stores'
    import Nav from '$lib/partials/Nav.svelte'

    import { Directus } from '@directus/sdk';
    const directus = new Directus('http://localhost:8055');
    setContext('directus', directus)
    
    export let isAuthenticated
    // console.log('ML expected isAuthenticated', isAuthenticated)
    // console.log('ML expected directus', directus)
    
    const start = async () => {
        if (isAuthenticated) {
            await directus.auth
            .refresh()
            .then( async () => {
                await getCurrentUser()
                console.log('ML in start() getCurrentUser : ', user)
                
            })
            .catch((err) => {
                console.log("Error when authenticated =>", err);
            });        
        }

    };
    start()
    const getCurrentUser = async () => {
        await directus.users.me
        .read({
            fields: ["id", "first_name", "last_name", "email", "avatar"],
        })
        .then( async (user) => {
            console.log('main __lay 1', user)
            $session.user.email = user.email
            
            // u.setUser(user);
            // console.log('main __lay 2',$u)
            return user
        })
        .catch((err) => console.log(err.message));
        };


</script>
<Nav />
<h1>Sveltkit Session / Jannick</h1>
<slot />