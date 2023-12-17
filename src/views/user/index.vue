<template>
  <div class="huo">
    <h1 class="title">
      欢迎来到去这儿旅行
    </h1>
    <el-steps direction="vertical" :active="1">
      <el-step title="Step 1" />
      <el-step title="Step 2" />
      <el-step title="Step 3" />
    </el-steps>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'user',
  components: {
  },
})
export default class extends Vue {

  created() {

  }
}

</script>

<style lang="scss">
.huo { display: flex; justify-content: center; align-items: center; height: 100vh; } .title { font-size: 32px; text-align: center; color: #333; margin-bottom: 20px; }
</style>
