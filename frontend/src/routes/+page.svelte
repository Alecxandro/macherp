<script>
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation'
    import axios from 'axios'

    let username = ''
    let password = ''
    let errorMessage = ''
    onMount(() => {
        let usernameField = document.getElementById('username')
        usernameField.focus()
    })

    async function handleLogin() {
        try {
            const { data } = await axios.post(
                'http://localhost:3000/user/login',
                { username, password }
            )

            localStorage.setItem('userToken', data.token)
            localStorage.setItem('userData', JSON.stringify(data.user))

            goto('/profile')
        } catch (error) {
            errorMessage =
                error.response?.data?.message ||
                'An error occurred. Please try again.'
        }
    }
</script>

<br />
<!-- <div class="container-sm">
        {#if errorMessage}
        <p style="color: red;">{errorMessage}</p>
    {/if}

    <div class="card">
        <div class="card-header">
            <center><i>Login to your account</i></center>
        </div>
        <div class="card-body">
            <form on:submit|preventDefault={handleLogin} class="">
                <div class="form-outline mb-4">
                    <label for="username" class="text-body-secondary form-label">username:</label>
                <input type="text" id="username" bind:value={username} required class="form-control">
                </div>
                <div class="form-outline mb-4">
                    <label for="password" class="text-body-secondary form-label">password:</label>
                <input type="password" id="password" bind:value={password} required class="form-control">
                </div>
            <center><button type="submit" class="btn btn-primary btn-block mb-4">Login</button></center>
            
        </form>
        
        </div>
        <div class="card-footer">
            <center><a href={`/register`} class="btn btn-success">Register</a></center>
        </div>
    </div>
    
</div> -->

<!-- <section class="vh-100 container">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6 text-black">
  
          <div class="px-5 ms-xl-4">
            <i class="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style="color: #709085;"></i>
            <span class="h1 fw-bold mb-0">CHMA ERP</span>
          </div>
            <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
  
            <form on:submit|preventDefault={handleLogin} style="width: 23rem;">
  
              <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Log in</h3>
                              <div data-mdb-input-init class="form-outline mb-4">
                    <input type="text" id="form2Example18" bind:value={username} class="form-control form-control-lg" />
                    <label class="form-label" for="form2Example18">username</label>
                  </div>
      
                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="password" id="form2Example28"  bind:value={password} class="form-control form-control-lg" />
                    <label class="form-label" for="form2Example28">password</label>
                  </div>
      
                  <div class="pt-1 mb-4">
                    <button data-mdb-button-init data-mdb-ripple-init class="btn btn-info btn-lg btn-block" type="submit">Login</button>
                  </div>
                                  
              <p>Don't have an account? <a href="/register" class="link-info">Register here</a></p>
  
         </form>
  
          </div>
  
        </div>
        <div class="col-sm-6 px-0 d-none d-sm-block">
          <img src={ imageUrl}
            alt="Login image" class="w-100 vh-100" style="object-fit: cover; object-position: left;">
        </div>
      </div>
    </div>
  </section> -->

<section
    class="hero is-fullheight is-justify-content-center is-align-items-center"
>
    <div class="hero-body has-text-centered">
        <div class="login">
            <h1 class="title is-1">mach erp</h1>
            <div class="container-sm">
                {#if errorMessage}
                    <p class="notification is-danger">
                        usuário ou senha incorretos.
                    </p>
                {/if}
                <form on:submit|preventDefault={handleLogin}>
                    <div class="field">
                        <div class="control">
                            <input
                                class="input is-large is-rounded"
                                id="username"
                                type="text"
                                placeholder="user"
                                autocomplete="username"
                                bind:value={username}
                                required
                            />
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <input
                                class="input is-large is-rounded"
                                type="password"
                                placeholder="**********"
                                autocomplete="current-password"
                                bind:value={password}
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <button
                        class="button is-block is-fullwidth is-link is-medium is-rounded"
                        type="submit"
                    >
                        login
                    </button>
                </form>
                <br />
                <nav class="level">
                    <div class="level-item has-text-centered">
                        <div>
                            <a href="#">recuperar senha</a>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div>
                            <a href="/register">criar conta</a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>

    <footer class="footer has-text-centered subtitle">mach software</footer>
</section>

<style>
    @import 'https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css';
</style>
