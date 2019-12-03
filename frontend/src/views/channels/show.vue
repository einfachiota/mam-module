<template>
    <div class="tab-container">
        <new-message :channel_id="channel.id"></new-message>
        <pre>{{channel}}</pre>
    </div>
</template>

<script>
import newMessage from './new_message'

export default {
  
  name: 'ShowChannel',
  components: { newMessage },
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
