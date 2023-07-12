<template>
  <div>
    <input type="text" v-model="parameters">
    <button @click="submit">Submit</button>
    <div>{{ result }}</div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const parameters = ref('');
    const result = ref('');

    const submit = async () => {
      const response = await fetch('/api/bash/normal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parameters: [parameters.value] })
      });

      const data = await response.json();
      result.value = data.result;
    };

    return { parameters, result, submit };
  }
}
</script>