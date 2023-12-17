<template>
  <div class="dashboard-container">
    <div class="container">
      <div class="tableBar"
           style="display: inline-block; width: 100%"
      >

        <label style="margin-right: 5px; margin-left: 20px">预约类型：</label>
        <el-select v-model="reservationsType"
                   placeholder="请选择"
                   clearable
                   style="width: 15%"
                   @clear="init"
        >
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"
          />
        </el-select>

        <el-button class="normal-btn continue"
                   @click="init(true)"
        >
          查询
        </el-button>
      </div>

      <el-table v-if="tableData.length"
                :data="tableData"
                stripe
                class="tableBox"
      >
        <el-table-column prop="resvkey"
                         label="预订id"
        />
        <el-table-column prop="custname"
                         label="用户姓名"
        />
        <el-table-column prop="resvtype" label="预约类型">
          <template slot-scope="scope">
    <span>
      {{ scope.row.resvtype === 1 ? '航班' : scope.row.resvtype === 2 ? '大巴' : scope.row.resvtype === 3 ? '酒店' : '' }}
    </span>
          </template>
        </el-table-column><

        <el-table-column label="操作"
                         width="200"
                         align="center"
        >
          <template slot-scope="scope">

            <el-button type="text"
                       size="small"
                       class="delBut"
                       @click="deleteHandle(scope.row.resvkey)"
            >
              取消
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Empty v-else
             :is-search="isSearch"
      />
      <el-pagination v-if="counts > 10"
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
import {
  getReservationsPage,
  deleReservations
} from '@/api/reservations'
import Empty from '@/components/Empty/index.vue'

@Component({
  name: 'reservations',
  components: {
    HeadLable,
    Empty
  }
})
export default class extends Vue {
  private options: any = [
    {
      value: 1,
      label: '航班'
    },
    {
      value: 2,
      label: '酒店'
    },
    {
      value: 3,
      label: '大巴'
    }
  ]
  private actionType: string = ''
  private id = ''
  private status = ''
  private reservationsType: number = null
  private name: string = ''
  private action: string = ''
  private counts: number = 0
  private page: number = 1
  private pageSize: number = 10
  private tableData = []
  private type = ''
  private isSearch: boolean = false
  created() {
    this.init()
  }

  // 初始化信息
  private async init(isSearch?) {
    this.isSearch = isSearch
    await getReservationsPage({
      page: this.page,
      pageSize: this.pageSize,
      name: this.name ? this.name : undefined,
      type: this.reservationsType ? this.reservationsType : 0
    })
      .then(res => {
        if (String(res.data.code) === '200') {
          this.tableData =
            res && res.data && res.data.data && res.data.data.records
          this.counts = Number(res.data.data.total)
        } else {
          this.$message.error(res.data.desc)
        }
      })
      .catch(err => {
        console.log(err, 'err')
        this.$message.error('请求出错了：' + err.message)
      })
  }


  //删除
  private deleteHandle(id: any) {
    this.$confirm('此操作将永久删除该分类，是否继续？', '确定删除', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      deleReservations(id)
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success('删除成功！')
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

  $refs!: {
    classData: any
  }


  //分页
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
.dashboard {
  &-container {
    margin: 30px;

    .container {
      background: #fff;
      position: relative;
      z-index: 1;
      padding: 30px 28px;
      border-radius: 4px;

      .tableBar {
        display: flex;
        margin-bottom: 20px;
        justify-content: space-between;
      }

      .tableBox {
        width: 100%;
        border: 1px solid $gray-5;
        border-bottom: 0;
      }

      .pageList {
        text-align: center;
        margin-top: 30px;
      }
      //查询黑色按钮样式
      .normal-btn {
        background: #333333;
        color: white;
        margin-left: 20px;
      }
    }
  }
}
</style>
<style lang='scss'>
// .customClass {
//   .el-button--primary {
//     background-color: #E7D177 !important ;
//   }
// }
</style>
