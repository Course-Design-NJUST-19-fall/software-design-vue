<template>
  <div>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-row>
          <el-col :span="13">
            <div style="font-size: 30px">
              学生与题目管理
            </div>
          </el-col>

          <el-col :span="11">
            <div class="grid-content bg-purple-light">
              <el-link href="\SelfCenterAdmin" target="_blank">个人中心</el-link>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-form :model="form"  ref="ruleForm" label-width="100px" class="demo-form">
          <el-form-item label="序号" >
            <el-input v-model="form.AddProblemId"></el-input>
          </el-form-item>

          <el-form-item label="题目名称" >
            <el-input v-model="form.AddProblemName"></el-input>
          </el-form-item>

          <el-form-item label="时间限制" >
            <el-input v-model="form.AddProblemLimitTime"></el-input>
          </el-form-item>

          <el-form-item label="内存限制" >
            <el-input v-model="form.AddProblemLimitMemory"></el-input>
          </el-form-item>

          <el-form-item label="文件路径" >
            <el-input v-model="form.AddProblemPath"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" >确认</el-button>
          </el-form-item>

        </el-form>
      </el-main>
    </el-container>



  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: "AddProblem",
  data() {
    return {
      form: {
        AddProblemId: '',
        AddProblemName:'',
        AddProblemLimitTime: '',
        AddProblemLimitMemory: '',
        AddProblemPath: '',
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }

}
</script>

<style scoped>

.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.demo-form{
  max-width: 500px;
  margin: 0 auto ;
}


</style>