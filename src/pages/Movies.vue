<template>
  <q-layout view="lHh Lpr lFf" style="background-color: #141414">
    <!-- Barra superior (Header) -->
    <q-header elevated>
      <q-toolbar>
        <!-- Logo -->
        <q-toolbar-title class="q-mr-md">
          <img src="../assets/logo.png" alt="Logo" height="50" width="100" />
        </q-toolbar-title>

        <!-- Barra de navegación horizontal -->
        <div class="q-mx-auto row items-center">
          <q-btn flat label="Inicio" />
          <q-btn flat label="Películas" />
          <q-btn flat label="Series" />
          <q-btn flat label="Mi Lista" />
        </div>

        <!-- Menú de usuario o botón adicional si es necesario -->
        <q-btn flat round icon="logout" @click="logOut" />
      </q-toolbar>
    </q-header>

    <!-- Contenedor de la página -->
    <q-page-container>
      <q-page>
        <!-- Mostrar películas -->
        <div v-if="movies.length > 0" class="movie-list">
          <q-card v-for="movie in movies" :key="movie.id" class="q-mb-md">
            <q-card-section>
              <div class="text-h6">{{ movie.title }}</div>
              <div class="vote-container">
                <div class="stars">
                  <q-icon
                    v-for="star in 5"
                    :key="star"
                    :name="getStarIcon(movie.vote_average, star)"
                    size="20px"
                    class="star-icon"
                    color="yellow"
                  />
                </div>
                <div class="text-body2">
                  Voto Promedio: {{ movie.vote_average }} / 10
                </div>
                <div class="text-body2">
                  Total de Votos: {{ movie.vote_count }}
                </div>
              </div>
            </q-card-section>
            <q-img
              :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
              alt="Movie Poster"
              class="movie-poster"
            />
          </q-card>
        </div>
        <div v-else>
          <p>Cargando películas...</p>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";

export default {
  name: "MoviesPage",
  data() {
    return {
      movies: [],
    };
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    logOut() {
      this.$router.push("/");
    },
    async fetchMovies() {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/movie",
          {
            params: {
              api_key: "7eb4454023729dff98d3eb434d3e8c7f", // Reemplaza con tu clave de API
              language: "es-ES", // Idioma opcional
            },
          }
        );
        this.movies = response.data.results;
      } catch (error) {
        console.error("Error al obtener las películas", error);
      }
    },
    // Método para determinar las estrellas
    getStarIcon(vote, index) {
      const fullStarThreshold = 2; // Umbral para una estrella llena
      const votePerStar = 2; // Cada estrella representa 2 puntos
      const rating = Math.round(vote / 2); // Convertir el puntaje en un valor entre 0 y 5
      return rating >= index ? "star" : "star_border";
    },
  },
};
</script>

<style scoped>
.q-header {
  background-color: #141414;
  color: #fff;
}

.q-btn {
  color: white;
}

.q-toolbar-title img {
  height: 40px;
}

.q-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.row {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.q-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(20, 20, 20);
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.q-card {
  background-color: #222;
  color: white;
  border-radius: 8px;
  overflow: hidden;
}

.q-card-section {
  padding: 10px;
}

.movie-poster {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-bottom: 2px solid #333;
  cursor: pointer;
}

.vote-container {
  margin-top: 10px;
}

.stars {
  display: flex;
  gap: 5px;
}

.star-icon {
  color: yellow;
}

.text-body2 {
  margin-top: 5px;
  color: #bbb;
}
</style>
