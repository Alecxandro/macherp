<script>
    import { goto } from '$app/navigation'
    import axios from 'axios'

    let username = ''
    let email = ''
    let password = ''
    let errorMessage = ''
    let successMessage = ''

    async function handleRegister() {
        try {
            await axios.post('http://localhost:3000/user/newuser', {
                username,
                email,
                password,
            })

            successMessage = 'Registration successful! Redirecting to login...'
            errorMessage = ''

            setTimeout(() => goto('/'), 2000)
        } catch (error) {
            errorMessage =
                error.response?.data?.message || 'Registration failed'
            successMessage = ''
        }
    }
</script>

<main class="container">
    <h1>Register</h1>

    {#if successMessage}
        <p style="color: green;">{successMessage}</p>
    {/if}

    {#if errorMessage}
        <p style="color: red;">{errorMessage}</p>
    {/if}

    <form on:submit|preventDefault={handleRegister} class="form-control">
        <div>
            <label for="username">Username:</label>
            <input type="text" id="username" bind:value={username} required />
        </div>
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" bind:value={email} required />
        </div>
        <div>
            <label for="password">Password:</label>
            <input
                type="password"
                id="password"
                bind:value={password}
                required
            />
        </div>
        <button type="submit">Register</button>
    </form>

    <p>Already have an account? <a href="/">Login here</a>.</p>
</main>

<style>
</style>
