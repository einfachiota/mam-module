<template>
  <div class="app-container">
    <new-channel></new-channel>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Root">
        <template slot-scope="scope">
         <pre>{{ scope.row.channel.root }}</pre>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created" label="Erstell am" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.timestamp | formatTimestampToDate }}</span>
        </template>
      </el-table-column>
         <el-table-column label="Actions" width="200"> 
        <template slot-scope="scope">
            <el-button @click="$router.push({name: 'ShowChannel', params: {channel: scope.row}})" type="success" icon="el-icon-view" circle></el-button>
            <el-button @click="openMamVIewer(scope.row)" type="primary" icon="el-icon-tickets" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel'
import newChannel from './new'

export default {
  components: { newChannel },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getChannels().then(response => {
        console.log('response', response)
        this.list = response
        this.listLoading = false
      })
    },
    openMamVIewer(channel) {
      let provider = 'https://nodes.devnet.iota.org'
      window.open(`https://mam-explorer.firebaseapp.com/?provider=${provider}&mode=restricted&key=${channel.channel.state.channel.side_key}&root=${channel.channel.root}`, "_blank");    
    }
  }
}
</script>
