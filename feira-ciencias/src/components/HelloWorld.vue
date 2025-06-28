<template>
  <div class="container">
    <button @click="fetchData" class="btn-fetch">Buscar Projeto</button>

    <div v-if="fact._id" class="card">
      <img v-if="fact.image" :src="fact.image" alt="Projeto Image" class="card-image" />
       <p v-if="fact.image" class="image-path">Caminho da Imagem: {{ fact.image }}</p>
      <div class="card-content">
        <h1 class="card-title">{{ fact.title }}</h1>
        <p class="card-category">Categoria: <span>{{ fact.category }}</span></p>
        <p class="card-description">{{ fact.description }}</p>

        <div class="card-info">
          <div class="info-item">
            <strong>Avaliação:</strong> {{ fact.avaliacao }} / 5
          </div>
          <div class="info-item" v-if="fact.num_de_avaliacoes !== undefined">
            <strong>Número de Avaliações:</strong> {{ fact.num_de_avaliacoes }}
          </div>
          <div class="info-item" v-if="fact.participants && fact.participants.length">
            <strong>Participantes:</strong>
            <span v-for="(p, i) in fact.participants" :key="i">{{ p }}<span v-if="i < fact.participants.length - 1">, </span></span>
          </div>
        </div>

        <div class="card-section" v-if="fact.materials && fact.materials.length">
          <h2>Materiais</h2>
          <ul class="materials-list">
            <li v-for="(m, idx) in fact.materials" :key="idx">{{ m }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReadOnlyFactViewer',
  data() {
    return { fact: {} };
  },
  methods: {
    async fetchData() {
      try {
        const res = await fetch('http://localhost:8081/projeto/project1');
        if (!res.ok) throw new Error('Fetch failed');
        this.fact = await res.json();
        console.log("OK");
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.btn-fetch {
  background: #2d8cf0;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
.btn-fetch:hover {
  background: #1a73e8;
}
.card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin-top: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
}
.card-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.card-content {
  padding: 1rem;
}
.card-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
}
.card-category span {
  background: #f0f0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}
.card-description {
  margin: 1rem 0;
  line-height: 1.4;
  text-align: justify;
}
.card-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  justify-content: center;
}
.info-item {
  font-size: 0.9rem;
}
.card-section h2 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  text-align: center;
}
.materials-list {
  list-style: disc;
  padding-left: 1.5rem;
}
.materials-list li {
  margin-bottom: 0.25rem;
}
</style>
