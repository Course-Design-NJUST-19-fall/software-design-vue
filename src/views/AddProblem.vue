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

          <el-col :span="10">
            <div class="grid-content bg-purple-light">
              <el-link @click="goHref('/SelfCenterAdmin')">返回管理中心</el-link>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-form :model="problem"  ref="ruleForm" :rules="rules" label-width="110px" class="demo-form">

          <el-form-item label="题目名称" prop="problemName">
            <el-input v-model="problem.problemName"></el-input>
          </el-form-item>

          <el-form-item label="时间限制(ms)" prop="cpuTimeLimit">
            <el-input v-model="problem.cpuTimeLimit"></el-input>
          </el-form-item>

          <el-form-item label="内存限制(kb)" prop="memoryLimit">
            <el-input v-model="problem.memoryLimit"></el-input>
          </el-form-item>

          <el-form-item label="题目难度" prop="rating">
            <el-select v-model="problem.rating" placeholder="请选择题目难度">
              <el-option label="简单" value="1"></el-option>
              <el-option label="较简单" value="2"></el-option>
              <el-option label="一般" value="3"></el-option>
              <el-option label="较困难" value="4"></el-option>
              <el-option label="困难" value="5"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="题面文件路径" prop="problemPath">
            <el-input v-model="problem.problemPath"></el-input>
          </el-form-item>

          <el-form-item label="输入文件路径" prop="inputPath">
            <el-input v-model="problem.inputPath"></el-input>
          </el-form-item>

          <el-form-item label="输出文件路径" prop="outputPath">
            <el-input v-model="problem.outputPath"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
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
      problem: {
        problemName:null,
        problemPath:null,
        cpuTimeLimit: null,
        memoryLimit: null,
        inputPath: null,
        outputPath:null,
        rating:null
      },
      rules: {
        problemName:[
          { required: true, message: '请输入题目名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        problemPath:[
          { required: true, message: '请输入输入文件路径', trigger: 'blur' },
        ],
        inputPath: [
          { required: true, message: '请输入输入文件路径', trigger: 'blur' },
        ],
        outputPath: [
          { required: true, message: '请输入输出文件路径', trigger: 'blur' },
        ],
        cpuTimeLimit:[
          { required: true, message: '请输入时间限制', trigger: 'blur' },
        ],
        memoryLimit:[
          { required: true, message: '请输入空间限制', trigger: 'blur' },
        ],
        rating: [
          { required: true, message: '请选则题目难度', trigger: 'change' }
        ],

      }
    }
  },
  methods: {
    goHref(href){
      this.$router.push(href);
    },
    onSubmit() {
      console.log('submit!');
    },
    submitForm(formName) {
      const _this=this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8181//problem/save',this.problem).then(function (resp){
            console.log(resp);
            if(resp.data){
              _this.$message({
                message:_this.problem.problemName+"  添加成功！",
                type:"success"
              })
            }
            else {
              _this.$message({
                message:"添加失败！",
                type:"error"
              })
            }
          })
        }
        else{
          return false;
        }
      });
    },
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