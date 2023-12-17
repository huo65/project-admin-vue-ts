<template>
  <div class="addBrand-container">
    <HeadLable :title="title"
               :goback="true"
    />
    <div class="container">
      <el-form ref="ruleForm"
               :model="ruleForm"
               :inline="false"
               label-width="180px"
               class="demo-ruleForm"
      >
        <!--        <el-form-item label="id:"-->
        <!--                      prop="custid">-->
        <!--          <el-input v-model="ruleForm.custid"-->
        <!--                    placeholder="位置"-->
        <!--                    maxlength="20" />-->
        <!--        </el-form-item>-->
        <el-form-item label="name:"
                      prop="price"
        >
          <el-input v-model="ruleForm.custname"
                    placeholder="请输入名字"
                    maxlength="12"
          />
        </el-form-item>

        <div class="subBox address">
          <!-- <el-form-item> -->
          <el-button @click="() => $router.push('/customers')">
            取消
          </el-button>
          <el-button type="primary"
                     :class="{ continue: actionType === 'add' }"
                     @click="submitForm('ruleForm', false)"
          >
            保存
          </el-button>
          <el-button v-if="actionType == 'add'"
                     type="primary"
                     @click="submitForm('ruleForm', true)"
          >
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
import { queryCustomersById, addCustomers, editCustomers } from '@/api/customers'

@Component({
  name: 'addCustomers',
  components: {
    HeadLable
  }
})
export default class extends Vue {
  private title = '添加员工'
  private actionType = ''
  private ruleForm = {
    custid: '0',
    custname: '',

  }
  created() {
    this.actionType = this.$route.query.id ? 'edit' : 'add'
    if (this.$route.query.id) {
      this.title = '修改员工信息'
      this.init()
    }
  }

  private async init() {
    const id = this.$route.query.id
    queryCustomersById(id).then((res: any) => {

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
          addCustomers(params)
            .then((res: any) => {
              if (res.data.code === 200) {
                this.$message.success('员工添加成功！')
                if (!st) {
                  this.$router.push({ path: '/customers' })
                } else {
                  this.ruleForm = {
                    custid: '0',
                    custname: '',
                  }
                }
              } else {
                this.$message.error('请求出错'+res.data.msg)
              }
            })
            .catch(() => {
              // this.$message.error('请求出错了：' + err.message)
            })
        } else {
          const params = {
            ...this.ruleForm,
          }
          editCustomers(params)
            .then((res: any) => {
              if (res.data.code === 200) {
                this.$message.success('员工信息修改成功！')
                this.$router.push({ path: '/customers' })
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
