<template>
    <div class="tab-container">
        <pre>{{channel}}</pre>
    </div>
</template>

<script>

export default {
  name: 'ShowChannel',
  components: { },
  params: ['channel'],
  data() {
    return {
        channel: {},
    }
  },
  mounted() {
    this.channel = this.$route.params.channel 
  }
}
</script>
