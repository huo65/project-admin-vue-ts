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
        :data="tableData"
        stripe
        class="tableBox"
      >
        <el-table-column prop="location" label="位置" />
        <el-table-column prop="price" label="价格/晚" />
        <el-table-column prop="numrooms" label="房间总数" />
        <el-table-column prop="numavail" label="剩余房间" />

        <el-table-column label="操作"
                         width="250"
                         align="center"
        >
          <template slot-scope="scope">
            <el-button type="text"
                       size="small"
                       class="blueBug"
                       @click="addReservations(scope.row.location)"
            >
              预订
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
import { deleteHotel, getHotelList } from '@/api/hotels'
import { addReservations, deleReservations } from '@/api/reservations'

@Component({
  name: 'Hotel',
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
  private name: string = ''
  private isSearch: boolean = false
  private resv = {
    resvtype :2,
    custname :'',
    model:''
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
    await getHotelList(params)
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

  private addReservations(location : string){
    this.resv.custname = this.name;
    if (this.name == ''){
      this.$message.error('请先登录')
    }else{
      this.$confirm('此操作将预订此航班，是否继续？', '确认', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.resv.model = location
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
