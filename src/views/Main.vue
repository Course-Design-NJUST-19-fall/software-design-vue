<template>
  <div>


    <el-container style="height: 500px; border: 1px solid #eee">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1"><el-link href="\Main" >主页</el-link></el-menu-item>
        <el-menu-item index="2"><el-link href="\ListProblem" >题目列表</el-link></el-menu-item>
        <el-menu-item index="3" ><el-link href="\ProblemStatus" >提交状态</el-link></el-menu-item>
        <el-menu-item index="4" ><el-link href="\SelfCenter" >个人中心</el-link></el-menu-item>
      </el-menu>
      <div class="line"></div>

      <el-main>
         <h1>
           Online Judge
         </h1>

      </el-main>


    </el-container>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      tableData: Array(20).fill(item),
      activeIndex: '1',
      activeIndex2: '1'
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

