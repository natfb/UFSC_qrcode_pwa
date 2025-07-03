<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6 gap-6">
    <h1 class="text-3xl font-bold mb-4">Leia os QR Codes para ver informações sobre os projetos da nossa feira de ciências! 🧪</h1>
    <button
      class="btn btn-secondary px-4 py-2 rounded-xl shadow text-white bg-green-600"
      @click="startScan"
    >
      Ler QR Code
    </button>

    <qrcode-stream
      v-if="scanning"
      @detect="onDecode"
      @init="onInit"
      class="w-full max-w-md mx-auto"
    >
      
    </qrcode-stream>

    <div v-if="project" class="mt-3 max-w-xl mx-auto p-6 bg-white shadow rounded" style="width: 80%;">
      <h1 class="text-2xl font-semibold mb-4">{{ project.title }}</h1>
      <img
        :src="`${project.image}`"
        :alt="project.title"
        class="w-full h-64 object-cover rounded mb-4"
      />
      <!-- se o front entiver em um servidor diferente -->
      <!-- :src="`http://localhost/images/${project.image}`" -->
       <!-- se o front entiver no mesmo servidor -->
      <!-- //:src="project.image" -->
      <p class="mb-4">{{ project.description }}</p>

      <h2 class="text-lg font-medium mb-2">Materiais</h2>
      <ul class="list-disc list-inside mb-4">
        <li v-for="m in project.materials" :key="m">{{ m }}</li>
      </ul>

      <h2 class="text-lg font-medium mb-2">Participantes</h2>
      <ul class="list-disc list-inside mb-4">
        <li v-for="p in project.participants" :key="p">{{ p }}</li>
      </ul>
      <p><strong>Avaliação:</strong> {{ project.avaliacao }}</p>
      <p class="text-sm text-gray-600"><strong>Categoria:</strong> {{ project.category }}</p>
      <div v-if="userJaAvaliou" class="mt-4 p-4 bg-green-100 text-green-800 rounded">
        <p class="font-bold">Obrigado por avaliar este projeto!</p>
        <p>Sua avaliação foi registrada.</p>
      </div>
     <div v-else class="d-flex justify-content-center align-items-center">
  
        <input 
          v-model.number="rating" 
          type="number" 
          min="0" 
          max="10" 
          step="1" 
          class="mt-4 p-2 border rounded" placeholder="Dê uma nota de 0 a 10..." 
        />
        <button 
        @click="sendAvaliation(project._id)"
          class="btn btn-success mt-4 px-4 py-2 rounded-xl shadow text-white bg-blue-600">
          Enviar Avaliação
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

const scanning = ref(false)
const project = ref(null)
const rating = ref(null);
const userJaAvaliou = ref(false);

function startScan() {
  scanning.value = true
}

async function onDecode(text) {
  scanning.value = false
  console.log(text[0].rawValue)
  try {
    // se o front estiver em outro servidor:
    // const response = await fetch(`http://localhost:8081/projeto/${text[0].rawValue}`, {
    // se o front estiver no mesmo servidor: 
    const response = await fetch(`/projeto/${text[0].rawValue}`, { 
      method: 'GET',
      
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const data = await response.json()
    console.log(data)
    project.value = data
  } catch (err) {
    console.error(err)
  }
}

function onInit(promise) {
  promise.catch(() => {
    scanning.value = false
    console.error('Camera init failed')
  })
}

// onMounted(() => {
  
//   const chaveLocalStorage = `avaliado_${props.project.id}`;
  
//   if (localStorage.getItem(chaveLocalStorage) === 'true') {
//     userJaAvaliou.value = true;
//   }
// });

async function sendAvaliation(projectId) {
  
  const payload = {
    nota: rating.value,
    id: projectId
  };

  try {
    // se o front estiver em outro servidor:
    // const response = await fetch(`http://localhost:8081/avaliar`, {
    const response = await fetch(`/avaliar`, {
    // se o front estiver no mesmo servidor: 
    

      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const data = await response.json()
    
    project.value = data.project; 
    rating.value = null;
    const chaveLocalStorage = `avaliado_${payload.id}`;
    localStorage.setItem(chaveLocalStorage, 'true');

    // Atualiza a nossa variável reativa para a interface mudar IMEDIATAMENTE
    userJaAvaliou.value = true;

    alert('Obrigado pela sua avaliação!');

  } catch (err) {
    console.error(err)
  }
}
</script>
