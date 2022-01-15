
<script>
  import {getContext} from 'svelte'
    const directus = getContext('directus')

    // console.log('sign in directus', directus)

  let email = 'test-1@galites.net'
  let password = 'Gien++45500'

  let error;
  let message;
  async function handleSubmit() {

    await directus.auth.login({email, password})
    
    const response = await fetch('/api/sign-in', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      error = (await response.json()).message;
      return;
    }
    message = (await response.json()).message;
    

    // setTimeout(() => {
    //   window.location = '/confidentiel';
    // }, 1000)

    window.location = '/confidentiel';
  }
</script>
<h3>Login page</h3>
<input type="email" name="emal" id="email" bind:value={email}>
<br><br>
<input type="password" name="password" id="password" bind:value={password}>
<br><br>
<button on:click={handleSubmit}>Se connecter</button>
<br>
{#if error}
    Error :  {error}
{/if}
{#if message}
   Message : {message}
{/if}