<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { fetchBook } from '../fetchbook.js'
  let book = {};
  let user = {};
  let url = window.location.href;
  const path = url.split("/book/")[1];
  console.log("Final path: " + path);
  onMount(async () => {
    // Check if user is logged in
    const token = localStorage.getItem("userToken");
    const storedUserData = localStorage.getItem("userData");

    if (token && storedUserData) {
      user = JSON.parse(storedUserData);
      book =  await fetchBook(token, path);
    } else {
      goto("/");
    }
  });

  // async function fetchBook(token) {
  //   try {
  //     const response = await fetch(`http://localhost:3000/book/${path}`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.ok) {
  //       book = await response.json();
  //     } else {
  //       console.error("Failed to fetch book:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // }

  function back() {
    goto("/profile");
  }
</script>

<style>
  @import "https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css";
</style>

<main class="container">
 <h3>{book.title}</h3> 
  <br>
  <h5>{ book.author }</h5>

  <button on:click={back}>Back</button>
</main>


