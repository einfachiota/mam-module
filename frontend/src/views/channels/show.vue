<template>
    <div class="tab-container">
        <new-message :channel_id="channel.id"></new-message>
        <pre>{{channel}}</pre>
        <pre>{{messages}}</pre>
    </div>
</template>

<script>
import newMessage from './new_message'
import { getMessages } from '@/api/channel'

export default {
  
  name: 'ShowChannel',
  components: { newMessage },
  params: ['channel'],
  data() {
    return {
        channel: {},
        messages: []
    }
  },
  mounted() {
    this.channel = this.$route.params.channel

    getMessages(this.channel.id).then(
        response => {
          console.log('response', response)
          this.messages = response
        },
        err => {
          console.log('err', err)
        }
      )
  }
}
</script>
