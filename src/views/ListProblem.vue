<template>
  <div>


    <el-container style="height: 750px; border: 1px solid #eee">
      <el-container>
     <el-header style="color: white; height: 60px;">
       <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
         <el-menu-item index="1"><el-link href="\Main" >主页</el-link></el-menu-item>
         <el-menu-item index="2"><el-link href="\ListProblem" >题目列表</el-link></el-menu-item>
         <el-menu-item index="3" ><el-link href="\ProblemStatus" >提交状态</el-link></el-menu-item>
         <el-menu-item index="4" ><el-link href="\SelfCenter" >个人中心</el-link></el-menu-item>
       </el-menu>
       <div class="line"></div>
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
      tableData: Array(20).fill(item),
      activeIndex: '2',
      activeIndex2: '2'
    }
  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }

}
</script>

<style>



.el-header {
  background-color: white;
  color: #333;
  line-height: 60px;
  bottom: 1px;
  width:100%;
  height:5px;
}


.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  align-self: center;
  margin: 0;
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

