<template>
  <div class="dashboard-container">
    <div class="container">
      <div class="tableBar"
           style="display: inline-block; width: 100%"
      >

  <label style="margin-right: 10px">用户名称：</label>
  <el-input v-model="username"
            placeholder="请填写用户名称（模拟登录）"
            style="width: 15%"
            clearable
            @clear="init"
            @keyup.enter.native="init"
  />
    <el-button class="normal-btn continue"
               @click="init(true)"
    >
      登录
    </el-button>

    <h1>路线图：</h1>
  <div ref="container" id="container"></div>
        <div>
          <el-button class="normal-btn continue"
                     @click="check()"
          >
            路线完整性检查
          </el-button>
        </div>
        <div  v-model='this.info'> </div>
  </div>
      </div>
  </div>
</template>

<script>
import G6 from '@antv/g6';
import { Component, Vue } from 'vue-property-decorator'
import {
  check,
  checkRoute

} from '@/api/reservations'
import HeadLable from '@/components/HeadLable/index.vue'
import Empty from '@/components/Empty/index.vue'
@Component({
  name: 'check',
  components: {
    HeadLable,
    Empty
  }
})
export default class extends Vue {
  // private username: string = ''

  username = '';
  info = 'null'
  created() {
    if (this.username != '') {
      this.init()
    }
  }
  init(){
    let Gdata;
    checkRoute({
      custName:this.username
    }).then(res => {
      if (String(res.data.code) === '200') {
        console.log(res)
        Gdata = res.data.data;
        console.log("Gdata"+Gdata)
        const container = this.$refs.container;
        const width = container.scrollWidth;
        const height = container.scrollHeight || 900;

        const graph = new G6.Graph({
          container: container,
          width: width,
          height: height,
          modes: {
            default: ['drag-canvas', 'drag-node'],
          },
          layout: {
            type: 'radial',
            unitRadius: 50,
            preventOverlap: true,
            maxPreventOverlapIteration: 100,
          },
          animate: true,
          defaultEdge: {
            style: {
              endArrow: {
                path: 'M 0,0 L 8,4 L 8,-4 Z',
                fill: '#e2e2e2',
              },
            },
          },
        });

        const nodes = Gdata.nodes;
        nodes.forEach((node) => {
          node.size = 100;
        });

        graph.data(Gdata);
        graph.render();

        if (typeof window !== 'undefined') {
          window.onresize = () => {
            if (!graph || graph.get('destroyed')) return;
            if (!container || !container.scrollWidth || !container.scrollHeight) return;
            graph.changeSize(container.scrollWidth, container.scrollHeight);
          };
        }
      } else {
        this.$message.error(res.data.desc)
      }
    })
  }
  check(){
    check({
      custName:this.username
    }).then(res => {
      if (String(res.data.code) === '200') {
        this.info =  res.data.data;
        console.log(this.info)
        if (this.info == null){
          this.info = "恭喜你路线完整"
        }
        this.$confirm(this.info, {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
      }else {
        this.$message.error(res.data.desc)
      }
    })
  }
};

</script>
<!--<style>-->
<!--//.routeCheck-->
<!--</style>-->
