<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-row>
            <el-col :span="14">
              <div style="font-size: 30px">
              题目列表页面
            </div>
            </el-col>

            <el-col :span="10">
              <div class="grid-content bg-purple-light">
                <el-link href="\SelfCenter" target="_blank">个人中心</el-link>
            </div>
            </el-col>
          </el-row>
        </el-header>
        <br>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple-light">
            <el-input v-model="input" placeholder="请输入题号"></el-input></div></el-col><el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-row>
        <el-main>






          <el-table :data="tableData" style="text-align: center">
            <el-table-column align="center" prop="ProblemId" label="编号"   >
            </el-table-column>
            <el-table-column align="center" prop="ProblemName" label="题目" >
            </el-table-column>
            <el-table-column align="center" prop="LimitTime" label="时间限制" >
            </el-table-column>
            <el-table-column align="center" prop="LimitMemory" label="内存限制" >
            </el-table-column>
            <el-table-column align="center" prop="rate_of_ac" label="正确率" >
            </el-table-column>
          </el-table>
        </el-main>


        <el-footer>
          <template>
            <div class="block">
              <span class="demonstration" ></span>
              <el-carousel trigger="click" height="150px">
                <el-carousel-item v-for="item in 4" :key="item">
                  <h3 class="small">{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </div>
          </template>
        </el-footer>

      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "ListProblem",
  data() {
    const item = {
      ProblemId: '2',
      ProblemName: '八皇后',
      LimitTime:'256ms',
      LimitMemory:'1mb',
      rate_of_ac: '23%(2300/10000)'
    };
    return {
      tableData: Array(20).fill(item)
    }
  },
  methods:{
    gotoSelfCenter:function(event){
      this.$router.push('/SelfCenter')
    }
  }

}
</script>

<style>



.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
  bottom: 1px;
  width:100%;
  height:500px;
}

.el-aside {
  color: #333;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  align-self: center;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  align-self: center;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
  align-self: center;
}

.el-col{
  text-align: right;

}

.el-footer{
  position:absolute;
  color:#fff;
  bottom: 100px;
  width:100%;
  height:100px;
  line-height:10px;
  text-align:center;
  background-color: white;
}

</style>

