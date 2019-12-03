<template>
  <div>
    <el-button type="primary" @click="openDialog">Create Message</el-button>
    <el-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" title="Create channel">
      <el-form :model="form" class="demo-form-inline">
        <el-form-item label="Name">
          <el-input v-model="form.name" placeholder="Your channel name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Send</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import { createMessage } from '@/api/channel'

export default {
  props: ['channel_id'],
  directives: { elDragDialog },
  data() {
    return {
      dialogTableVisible: false,
      form: {
        name: ''
      }
    }
  },
  methods: {
    openDialog() {
      this.dialogTableVisible = true
    },
    onSubmit() {
      this.dialogTableVisible = false
      createMessage(this.channel_id, this.form).then(
        response => {
          console.log('response', response)
        },
        err => {
          console.log('err', err)
        }
      )
    }
  }
}
</script>

<style>
</style>