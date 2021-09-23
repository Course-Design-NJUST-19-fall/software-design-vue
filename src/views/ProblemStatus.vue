<template>
<div>
  <el-container style="height: 500px; border: 1px solid #eee">


    <el-container>
      <el-header style="background-color: #B3C0CD;  text-align: right; font-size: 12px">
        <el-menu style="background-color: #B3C0CD" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item style="color: #333333" index="1"><el-link href="\Main" >主页</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="2"><el-link href="\ListProblem" >题目列表</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="3" ><el-link href="\ProblemStatus" >提交状态</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="4" ><el-link href="\SelfCenter" >个人中心</el-link></el-menu-item>
        </el-menu>
        <div class="line"></div>
      </el-header>

      <el-table  data="tableData" style="text-align: center">//v-loading="loading" :
        <el-table-column align="center" prop="ProblemId" label="编号"   >
        </el-table-column>
        <el-table-column align="center" prop="ProblemName" label="题目" >
        </el-table-column>
        <el-table-column align="center" prop="Result" label="结果" >
        </el-table-column>
        <el-table-column align="center" prop="LimitTime" label="使用时间" >
        </el-table-column>
        <el-table-column align="center" prop="LimitMemory" label="使用内存" >
        </el-table-column>
      </el-table>
    </el-container>
  </el-container>
</div>
</template>

<script>
export default {
  name: "ProblemStatus",
  data() {
    const item = {
      ProblemId: '2',
      ProblemName: '八皇后',
      Result: '23%(2300/10000)',
      LimitTime:'256ms',
      LimitMemory:'1mb',
    };
    return {
      tableData: Array(20).fill(item),
      activeIndex: '3',
      activeIndex2: '3'
    }
  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }

}
</script>

<style scoped>
.el-header {
  background-color: white;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

body {
  margin: 0;
}
</style>