<template>
<div>
  <el-container style="height: 500px; border: 1px solid #eee">


    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-row>
          <el-col :span="12">
            <div style="font-size: 30px">
              题目提交状态页面
            </div>
          </el-col>

          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-link href="\SelfCenter" >个人中心&nbsp</el-link>
              <el-link href="\ShowProblem" >返回</el-link>
            </div>
          </el-col>
        </el-row>
      </el-header>

      <el-table :data="tableData" style="text-align: center">
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
      Result: 'Accept',
      LimitTime:'256ms',
      LimitMemory:'1mb',
    };
    return {
      tableData: Array(20).fill(item)
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>