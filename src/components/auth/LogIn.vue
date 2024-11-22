<template>
  <div class="div-login">
    <div class="wrapper">
      <div class="title"><span>Inicia sesión</span></div>
      <form @submit.prevent="iniciarSesion">
        <div class="row">
          <i class="fas fa-user"></i>
          <input
            v-model="email"
            type="text"
            placeholder="Email o número de celular"
            required
          />
        </div>
        <div class="row">
          <i class="fas fa-lock"></i>
          <input
            v-model="password"
            type="password"
            placeholder="Contraseña"
            required
          />
        </div>
        <div class="row button">
          <input type="button" value="Login" @click="iniciarSesion" />
        </div>
        <div class="additional-options">
          <div class="remember-me">
            <input type="checkbox" id="remember" v-model="remember" />
            <label for="remember">Recuérdame</label>
          </div>
          <a href="#" class="forgot-password">¿Olvidaste la contraseña?</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    iniciarSesion() {
      let endpointURL = "/user/signin";
      let user = {
        email: this.email,
        password: this.password,
      };
      if (user.email === "" || user.password === "") {
        this.$q.dialog({
          title: "Error",
          message: "Ingrese sus credenciales.",
          ok: "Entendido",
        });
      } else {
        this.$api
          .post(endpointURL, user)
          .then((response) => {
            //Save response.data in LocalStorage
            localStorage.setItem("userData", JSON.stringify(response.data));

            console.log(response);
            //Notify success
            this.$q.notify({
              message: "Bienvenido",
              color: "positive",
              icon: "check_circle",
              timeout: 2000,
            });
            //Redirect to  /dashboard
            this.$router.push("/Movies");
          })
          .catch((error) => {
            //Notify error
            this.$q.dialog({
              title: "Error",
              message: "Credenciales incorrectas.",
              ok: "Entendido",
            });
          });
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

.div-login {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
  background-size: cover;
  background-position: center;
  padding: 15px;
}

.wrapper {
  max-width: 450px;
  width: 100%;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 4px;
  padding: 60px 68px 40px;
}

.wrapper .title {
  margin-bottom: 28px;
}

.wrapper .title span {
  color: #fff;
  font-size: 32px;
  font-weight: 500;
}

.wrapper form .row {
  margin-bottom: 16px;
  position: relative;
}

.wrapper form .row input:not([type="checkbox"]) {
  width: 100%;
  height: 50px;
  padding: 16px 20px;
  border-radius: 4px;
  background: #333;
  border: none;
  color: #fff;
  font-size: 16px;
}

.wrapper form .row input:focus {
  background: #454545;
  outline: none;
}

.wrapper form .row input::placeholder {
  color: #8c8c8c;
}

.wrapper form .button input {
  background: #e50914;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  margin-top: 24px;
}

.wrapper form .button input:hover {
  background: #f40612;
}

.additional-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.remember-me {
  display: flex;
  align-items: center;
  color: #b3b3b3;
}

.remember-me input[type="checkbox"] {
  margin-right: 5px;
}

.forgot-password {
  color: #b3b3b3;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.signup-link {
  color: #737373;
  margin-top: 16px;
  font-size: 16px;
}

.signup-link a {
  color: #fff;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: underline;
}
</style>
