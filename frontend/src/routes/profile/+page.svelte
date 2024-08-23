<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import axios from 'axios';

    let user = {};
    let books = [];

    onMount(async () => {
        const token = localStorage.getItem('userToken');
        const storedUserData = localStorage.getItem('userData');
        
        if (token && storedUserData) {
            user = JSON.parse(storedUserData);
            await fetchUserBooks(token);
        } else {
            goto('/');
        }
    });

    // async function fetchUserBooks(token) {
    //     try {
    //         const response = await fetch('http://localhost:3000/book/listbooks', {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'application/json'
    //             }
    //         });

    //         if (response.ok) {
    //             books = await response.json();
    //         } else {
    //             console.error('Failed to fetch books:', response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('An error occurred:', error);
    //     }
    // }

    async function fetchUserBooks(token) {
  try {
    // Make GET request using Axios
    const { data: books } = await axios.get('http://localhost:3000/book/listbooks', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Use the fetched books data
    console.log(books);
  } catch (error) {
    // Handle errors more effectively
    console.error('Failed to fetch books:', error.response?.statusText || error.message);
  }
    }

    function handleLogout() {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        goto('/');
    }
</script>

<style>
    @import "https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css";
</style>

    <div class="container">
        <h1>Welcome, {user.username}!</h1>
    <p>Email: {user.email}</p>

    <h2>Your Books</h2>
    {#if books.length > 0}
        <ul>
            {#each books as book}
                <!-- <li>{book.title} by {book.author}</li> -->
                 
                <br><a href={`/book/${book._id}`}>{book.title} by {book.author}</a>
            {/each}
        </ul>
    {:else}
        <p>You haven't registered any books yet.</p>
    {/if}

    <button on:click={handleLogout}>Logout</button>
</div>
    



