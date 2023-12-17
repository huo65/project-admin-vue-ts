<template>
  <div class="addBrand-container">
    <HeadLable :title="title"
               :goback="true" />
    <div class="container">
      <el-form ref="ruleForm"
               :model="ruleForm"
               :inline="false"
               label-width="180px"
               class="demo-ruleForm">

        <el-form-item label="航班号:"
                      prop="flightnum">
          <el-input v-model="ruleForm.flightnum"
                    placeholder="位置"
                    maxlength="20" />
        </el-form-item>
        <el-form-item label="起点:"
                      prop="fromcity">
          <el-input v-model="ruleForm.fromcity"
                    placeholder="请输入起点"
                    maxlength="12" />
        </el-form-item>
        <el-form-item label="终点:"
                      prop="arivcity">
          <el-input v-model="ruleForm.arivcity"
                    placeholder="请输入终点"
                    maxlength="11" />
        </el-form-item>
        <el-form-item label="票价:"
                      prop="price">
          <el-input v-model="ruleForm.price"
                    placeholder="请输入票价"
                    maxlength="12" />
        </el-form-item>
        <el-form-item label="座位数:"
                      prop="numseats">
          <el-input v-model="ruleForm.numseats"
                    placeholder="请输入座位数"
                    maxlength="12" />
        </el-form-item>



        <div class="subBox address">
          <!-- <el-form-item> -->
          <el-button @click="() => $router.push('/flights')">
            取消
          </el-button>
          <el-button type="primary"
                     :class="{ continue: actionType === 'add' }"
                     @click="submitForm('ruleForm', false)">
            保存
          </el-button>
          <el-button v-if="actionType == 'add'"
                     type="primary"
                     @click="submitForm('ruleForm', true)">
            保存并继续添加
          </el-button>
          <!-- </el-form-item> -->
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HeadLable from '@/components/HeadLable/index.vue'
import { queryFlightsById, addFlights, editFlights } from '@/api/flights'

@Component({
  name: 'addFlights',
  components: {
    HeadLable
  }
})
export default class extends Vue {
  private title = '添加航班'
  private actionType = ''
  private ruleForm = {
    arivcity: '',
    flightnum: '',
    fromcity: '',
    numavail:'',
    price: '',
    numseats:''
  }


  created() {
    this.actionType = this.$route.query.id ? 'edit' : 'add'
    if (this.$route.query.id) {
      this.title = '修改航班信息'
      this.init()
    }
  }

  private async init() {
    const id = this.$route.query.id
    queryFlightsById(id).then((res: any) => {

      if (res.data.code === 200) {
        this.ruleForm = res.data.data
      } else {
        this.$message.error(res.data.msg)
      }
    })
  }

  private submitForm(formName: any, st: any) {
    (this.$refs[formName] as any).validate((valid: any) => {
      if (valid) {
        if (this.actionType === 'add') {
          const params = {
            ...this.ruleForm,
          }
          addFlights(params)
            .then((res: any) => {
              if (res.data.code === 200) {
                this.$message.success('航班添加成功！')
                if (!st) {
                  this.$router.push({ path: '/flights' })
                } else {
                  this.ruleForm = {
                    arivcity: '',
                    flightnum: '',
                    fromcity: '',
                    numavail:'',
                    price: '',
                    numseats:''
                  }
                }
              } else {
                this.$message.error(res.data.msg)
              }
            })
            .catch(() => {
              // this.$message.error('请求出错了：' + err.message)
            })
        } else {
          const params = {
            ...this.ruleForm,
          }
          editFlights(params)
            .then((res: any) => {
              if (res.data.code === 200) {
                this.$message.success('航班信息修改成功！')
                this.$router.push({ path: '/flights' })
              } else {
                this.$message.error(res.data.msg)
              }
            })
            .catch(() => {
              // this.$message.error('请求出错了：' + err.message)
            })
        }
      } else {
        return false
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.addBrand {
  &-container {
    margin: 30px;
    margin-top: 0px;
    .HeadLable {
      background-color: transparent;
      margin-bottom: 0px;
      padding-left: 0px;
    }
    .container {
      position: relative;
      z-index: 1;
      background: #fff;
      padding: 30px;
      border-radius: 4px;
      // min-height: 500px;
      .subBox {
        padding-top: 30px;
        text-align: center;
        border-top: solid 1px $gray-5;
      }
    }
    .idNumber {
      margin-bottom: 39px;
    }

    .el-form-item {
      margin-bottom: 29px;
    }
    .el-input {
      width: 293px;
    }
  }
}
</style>
