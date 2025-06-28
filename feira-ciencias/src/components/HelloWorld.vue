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
      :constraints="{ facingMode: { exact: 'environment' } }"
      @decode="onDecode"
      @init="onInit"
      class="w-full max-w-md mx-auto"
    >
      <div class="text-red-600 p-4">Permissão para a câmera negada.</div>
    </qrcode-stream>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

const scanning = ref(false)

function startScan() {
  scanning.value = true
}

async function onDecode(text) {
  scanning.value = false
  try {
    const response = await fetch(text, {
      method: 'GET',
      credentials: 'include'
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const data = await response.json()
    console.log(data)
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
