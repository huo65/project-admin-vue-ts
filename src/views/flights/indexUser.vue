<template>
  <div class="dashboard-container">
    <div class="container">
      <div class="tableBar" />
      <label style="margin-right: 10px">用户名称：</label>
      <el-input v-model="name"
                placeholder="请填写用户名称（模拟登录）"
                style="width: 15%"
                clearable
                @clear="init"
                @keyup.enter.native="init"
      />
      <el-table
        v-if="tableData.length"
        :data="tableData" stripezz
        class="tableBox"
      >
        <el-table-column prop="flightnum" label="航班号" />
        <el-table-column prop="fromcity" label="起点" />
        <el-table-column prop="arivcity" label="终点" />
        <el-table-column prop="price" label="票价" />
        <el-table-column prop="numseats" label="座位总数" />
        <el-table-column prop="numavail" label="剩余座位" />

        <el-table-column label="操作"
                         width="250"
                         align="center"
        >
          <template slot-scope="scope">
            <el-button type="text"
                       size="small"
                       class="blueBug"
                       @click="addReservations()"
            >
              预约
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <Empty v-else :is-search="isSearch" />
      <el-pagination
        class="pageList"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="counts"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HeadLable from '@/components/HeadLable/index.vue'
import { UserModule } from '@/store/modules/user'
import InputAutoComplete from '@/components/InputAutoComplete/index.vue'
import Empty from '@/components/Empty/index.vue'
import { deleteFlights, getFlightsList } from '@/api/flights'
import { deleteDish } from '@/api/dish'
import { addReservations, deleReservations } from '@/api/reservations'

@Component({
  name: 'Flights',
  components: {
    HeadLable,
    InputAutoComplete,
    Empty,
  },
})
export default class extends Vue {
  private input: any = ''
  private counts: number = 0
  private page: number = 1
  private pageSize: number = 10
  private tableData = []
  private isSearch: boolean = false
  private name: string = ''
  private resv = {
    resvtype :1,
    custname :''
  }

  created() {
    this.init()
  }

  initProp(val) {
    this.input = val
    this.initFun()
  }

  initFun() {
    this.page = 1
    this.init()
  }

  get userName() {
    return UserModule.username
  }

  private async init(isSearch?: boolean) {
    this.isSearch = isSearch
    const params = {
      page: this.page,
      pageSize: this.pageSize,
      name: this.input ? this.input : undefined,
    }
    await getFlightsList(params)
      .then((res: any) => {
        if (String(res.data.code) === '200') {
          this.tableData = res.data && res.data.data && res.data.data.records
          this.counts = res.data.data.total
        }
      })
      .catch((err) => {
        this.$message.error('请求出错了：' + err.message)
      })
  }

  private addReservations(){
    this.resv.custname = this.name;
    if (this.name == ''){
      this.$message.error('请先登录')
    }else{
    this.$confirm('此操作将预订此酒店，是否继续？', '确认', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      const params = {
        ...this.resv,
      }
      addReservations(params)
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success('预约成功！')
            this.init()
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(err => {
          this.$message.error('请求出错了：' + err.message)
        })
    })
  }
}

  private handleSizeChange(val: any) {
    this.pageSize = val
    this.init()
  }

  private handleCurrentChange(val: any) {
    this.page = val
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.disabled-text {
  color: #bac0cd !important;
}
</style>
