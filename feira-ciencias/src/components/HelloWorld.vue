<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6 gap-6">
    <button
      class="px-4 py-2 rounded-xl shadow text-white bg-green-600"
      @click="startScan"
    >
      Click me
    </button>

    <qrcode-stream
      v-if="scanning"
      @detect="onDecode"
      @init="onInit"
      class="w-full max-w-md mx-auto"
    >
      <div class="text-red-600 p-4">Permissão para a câmera negada.</div>
    </qrcode-stream>

    <div v-if="project" class="max-w-xl w-full mx-auto p-6 bg-white shadow rounded">
      <h1 class="text-2xl font-semibold mb-4">{{ project.title }}</h1>
      <img
        :src="project.image"
        :alt="project.title"
        class="w-full h-64 object-cover rounded mb-4"
      />
      <p class="mb-4">{{ project.description }}</p>

      <h2 class="text-lg font-medium mb-2">Materiais</h2>
      <ul class="list-disc list-inside mb-4">
        <li v-for="m in project.materials" :key="m">{{ m }}</li>
      </ul>

      <h2 class="text-lg font-medium mb-2">Participantes</h2>
      <ul class="list-disc list-inside mb-4">
        <li v-for="p in project.participants" :key="p">{{ p }}</li>
      </ul>

      <p class="text-sm text-gray-600"><strong>Categoria:</strong> {{ project.category }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

const scanning = ref(false)
const project = ref(null)

function startScan() {
  scanning.value = true
}

async function onDecode(text) {
  scanning.value = false
  console.log(text)
  try {
    const response = await fetch(text, {
      method: 'GET',
      credentials: 'include'
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
</script>
