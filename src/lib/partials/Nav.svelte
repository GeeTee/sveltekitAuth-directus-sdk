<script>
  import {session} from '$app/stores';
  const navigation = [
    {
      href: '/',
      name: 'Home'
    },
    {
      href: '/confidentiel',
      name: `${$session.user ? "🔓" : "🔒"} Confidentiel`
    }
  ];
</script>
<nav>
    {#each navigation as link}
        <a href={link.href} class='text-lg font-medium text-white hover:text-indigo-50'>
            {link.name}
        </a>
    {/each}
    {#if $session.user}
         <a href="/sign-out">Dé Connexion</a>
    {:else}
         <a href="/sign-in">Connexion</a>
    {/if}
</nav>

<style>
  nav > * {
    margin: 1rem .4rem;
  }
</style>