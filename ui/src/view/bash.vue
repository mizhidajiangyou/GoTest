<template>
    <div>
        <input type="text" v-model="content">
        <button @click="submit">OK</button>
        <div>{{ result }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            content: '',
            result: ''
        }
    },
    methods: {
        async submit() {
            const response = await this.$http.post('/api/bash-api/normal', { content: this.content });
            this.result = response.data.result;
        }
    }
}
</script>