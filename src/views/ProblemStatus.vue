<template>
<div>
  <el-container style=" border: 1px solid #eee">

      <el-header style="background-color: #B3C0CD;  text-align: right; font-size: 12px">
        <el-menu style="background-color: #B3C0CD" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item style="color: #333333" index="1"><el-link @click="goHref('/Main')" >主页</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="2"><el-link @click="goHref('/ListProblem')" >题目列表</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="3" ><el-link @click="goHref('/ProblemStatus')" >提交状态</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="4" ><el-link @click="goCenter()" >个人中心</el-link></el-menu-item>

        </el-menu>
        <div class="line"></div>
      </el-header>

      <el-table  :data="testRecord" style="text-align: center;font-size: 15px" row-style="height:20px" cell-style="padding:0">
        <el-table-column  align="center" prop="id" label="测评编号"   >
        </el-table-column>
        <el-table-column align="center" prop="problemId" label="题目编号"   >
          <template slot-scope="scope">
            <div>
              <a href="javascript:;" @click="goProblem(scope.row)">{{scope.row.problemId}}</a>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="submitTime" label="提交时间" >
        </el-table-column>
        <el-table-column align="center" prop="result" label="结果" >
          <template slot-scope="scope">
              <span v-if="scope.row.result == 'ACCEPT'" style="color:forestgreen;font-weight: bolder">Accept</span>
              <span v-if="scope.row.result == 'WRONG_ANSWER'" style="color:blue">Wrong Answer</span>
            <span v-if="scope.row.result == 'RUNTIME_ERROR'" style="color:blue">Runtime Error</span>
            <span v-if="scope.row.result == 'TIME_LIMIT_EXCEEDED'" style="color:blue">Time Limit Exceeded</span>
            <span v-if="scope.row.result == 'MEMORY_LIMIT_EXCEEDED'" style="color:blue">Memory Limit Exceeded</span>
            <span v-if="scope.row.result == 'SEGMENTATION_FAULT'" style="color:blue">Segmentation Fault</span>
            <span v-if="scope.row.result == 'UNKNOWN_ERROR'" style="color:blue">Unknown Error</span>
            <span v-if="scope.row.result == 'OUTPUT_LIMIT_EXCEED'" style="color:blue">output limit exceed</span>
            <span v-if="scope.row.result == 'UNABLE_TO_GET_INPUT'" style="color:blue">unable to get input</span>
            <span v-if="scope.row.result == 'UNABLE_TO_MAKE_OUTPUT'" style="color:blue">unable to make output</span>
            <span v-if="scope.row.result == 'UNABLE_TO_EXECVE'" style="color:blue">unable to run as a low power user</span>
            <span v-if="scope.row.result == 'UNABLE_TO_SET_UID'" style="color:blue">unable to get input</span>
            <span v-if="scope.row.result == 'UNABLE_TO_LIMIT_MEM'" style="color:blue">unable to limit memory</span>
            <span v-if="scope.row.result == 'UNABLE_TO_LIMIT_CPU_TIME'" style="color:blue">unable to limit cpu time</span>
            <span v-if="scope.row.result == 'UNABLE_TO_LIMIT_OUTPUT'" style="color:blue">unable to limit output</span>
            <span v-if="scope.row.result == 'UNABLE_TO_LIMIT_STACK'" style="color:blue">unable to limit stack</span>
            <span v-if="scope.row.result == 'UNABLE_TO_SECCOMP'" style="color:blue">unable to limit system call</span>
            <span v-if="scope.row.result == 'UNABLE_TO_LIMIT_REAL_TIME'" style="color:blue">unable to limit real time</span>
            <span v-if="scope.row.result == 'CONFIG_ERROR'" style="color:blue">sandbox setting error</span>
            <span v-if="scope.row.result == 'COMPILATION_ERROR'" style="color:blue">Compilation Error</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="cpuTimeCost" label="使用时间" >
        </el-table-column>
        <el-table-column align="center" prop="memoryCost" label="使用内存" >
        </el-table-column>
        <el-table-column align="center" prop="submitterId" label="提交者">
        </el-table-column>
      </el-table>
      <el-pagination
          background
          layout="prev, pager, next"
          page-size="10"
          :total="total"
          @current-change="page"
      >
      </el-pagination>
  </el-container>
</div>
</template>

<script>
const axios=require('axios')
export default {
  name: "ProblemStatus",
  data() {
    return {
      testRecord: null,
      total:null,
      activeIndex: '3',
    }
  },
  methods:{
    goCenter(){
      if (sessionStorage.getItem('store')) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
      }
      const _this=this;
      if(this.$store.state.userId==null){
        _this.$message({
          message:"请登录",
          type:"error"
        })
        this.$router.push('/Login');
      }
      else {
        axios.get('http://localhost:8181//account/findById/'+_this.$store.state.userId).then(function (resp){
          _this.account=resp.data;
          console.log(resp.data)
          if(_this.account.sort==='学生')
            _this.$router.push('/SelfCenter');
          else if(_this.account.sort==='老师')
            _this.$router.push('/SelfCenterTeacher');
          else if(_this.account.sort==='管理员')
            _this.$router.push('/SelfCenterAdmin');
        })
      }
    },
    goProblem(row){
      this.$router.push({
        path:'/ShowProblem',
        query:{
          id:row.problemId,
        }
      })
    },
    goHref(href){
      this.$router.push(href);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    page(CurrentPage){
      const _this=this;
      axios.get('http://localhost:8181//testRecord/findAll/'+CurrentPage+'/10').then(function (resp){
            _this.testRecord=resp.data.records
            _this.total=resp.data.total
            console.log(_this.testRecord)
          }
      )
    }
  },
  created() {
    const _this=this;
    let CurrentPage= this.$route.query.currentPage;
    if(CurrentPage==null)CurrentPage=1;
    axios.get('http://localhost:8181//testRecord/findAll/'+CurrentPage+'/10').then(function (resp){
          _this.testRecord=resp.data.records
          _this.total=resp.data.total
          console.log(_this.testRecord)
        }
    )
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