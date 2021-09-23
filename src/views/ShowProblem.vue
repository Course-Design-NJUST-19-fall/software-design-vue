<template>
  <div>
    <el-container style="height: 800px; border: 1px solid #eee">
     <el-header style=" background-color: #B3C0CD; text-align: right; font-size: 12px;">

       <el-menu style="background-color: #B3C0CD" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item style="color: #333333" index="1"><el-link @click="goHref('/Main')" >主页</el-link></el-menu-item>
      <el-menu-item style="color: #333333" index="2"><el-link @click="goHref('/ListProblem')" >题目列表</el-link></el-menu-item>
      <el-menu-item style="color: #333333" index="3" ><el-link @click="goHref('/ProblemStatus')" >提交状态</el-link></el-menu-item>
      <el-menu-item style="color: #333333" index="4" ><el-link @click="goCenter()" >个人中心</el-link></el-menu-item>
      <el-menu-item style="color: #333333" index="5" ><el-link type="success" @click="goHref('/ShowProblem')" >题目详情</el-link></el-menu-item>
      <el-menu-item style="color: #333333" index="6" ><el-link type="success" @click="goSubmit(problemId)" >提交代码</el-link></el-menu-item>
    </el-menu>
    <div class="line"></div>
  </el-header>
    <el-container>
      <el-container>
        <el-main>
          <div>
            <h1 v-html="articless.title"style="width:100%;font-size: 30px;display: block;text-align: center;"></h1>
            <div style="width:50%;display: inline-block;height: 45px;text-align: end;line-height: 45px;">时间限制：</div>
            <div v-html="articless.timelimit" style="width:4%;height: 45px;text-align: center;display: inline-block;line-height: 45px;"></div>
            <div style="width:46%;display: inline-block;height: 45px;line-height: 45px;">MS</div>
            <div style="width:50%;display: inline-block;height: 45px;text-align: end;line-height: 45px;">空间限制：</div>
            <div v-html="articless.memorylimit" style="width:5%;height: 45px;text-align: center;display: inline-block;line-height: 45px;"></div>
            <div style="width:45%;display: inline-block;height: 45px;line-height: 45px;">KB</div>
            <h3>题目描述：</h3>
            <div v-html="articless.description"></div>
            <h3>输入描述：</h3>
            <div v-html="articless.inputdescription"></div>
            <h3>输出描述：</h3>
            <div v-html="articless.outputdescription"></div>
            <h3>输入样例：</h3>
            <div v-html="articless.inputsample"></div>
            <h3>输出样例：</h3>
            <div v-html="articless.outputsample"></div>
            <h3>提示/说明：</h3>
            <div v-html="articless.hint"></div>
          </div>
          <el-row>
            <div style="width:45%;display: inline-block;text-align: end;" > <el-button type="primary" round @click="goSubmit(problemId)">提交答案</el-button></div>
            <div style="width:10%;display: inline-block;text-align: end;"></div>
            <div style="width:45%;display: inline-block;" ><el-button type="primary" round @click="goBack()">返回列表</el-button></div>
          </el-row>
        </el-main>
      </el-container>
      </el-container>
      </el-container>

  </div>

</template>

<script>
const axios = require('axios');
export default {
  name: "ShowProblem",
  data() {
    return {
      activeIndex: '5',
      problem:null,
      fromPage:null,
      articless:null,
      problemId: null,
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
    goHref(href){
      this.$router.push(href);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goSubmit(ProblemId){
      const _this=this;
      if(this.$store.state.userId==null) {
        _this.$message({
          message:"请先登录账户",
          type:"error"
        })
        this.$router.push('/Login');
      }
      else {
        this.$router.push({
          path: '/Submit',
          query: {
            problemId: ProblemId,
            fromPage: this.fromPage
          }
        })
      }
    },
    goBack(){
      this.$router.push({
        path:'/ListProblem',
        query:{
          currentPage:this.fromPage
        }
      })
    }
  },
  created() {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
    }
    const _this=this;
    this.fromPage=this.$route.query.currentPage;
    this.problemId=this.$route.query.id;
    axios.get('http://localhost:8181//problem/findById/'+this.$route.query.id).then(function (resp){
          _this.problem=resp.data;
          console.log(resp.data);
          _this.$http.get(_this.problem.problemPath).then((response) => {
           _this.articless=response.data;
           console.log(response.data);
        })
    })


  }
}
</script>

<style scoped>
.el-header{
  background: white;
}
</style>