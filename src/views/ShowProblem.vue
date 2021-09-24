<template>
  <div>
    <el-container style="height: 800px;">
      <div class="background">
        <vue-particles
            color="#dedede"
            :particleOpacity="0.8"
            :particlesNumber="80"
            shapeType="circle"
            :particleSize="4"
            linesColor="#dedede"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.8"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
        >
        </vue-particles>
      </div>

     <el-header style=" background-color: #DCDFE6; text-align: right; font-size: 12px;">

       <el-menu style="background-color: Transparent" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item style="color: #333333" index="1"><el-link @click="goHref('/Main')" >主页</el-link></el-menu-item>
      <el-menu-item style="color: #333333" index="2"><el-link @click="goHref('/ListProblem')" >题目列表</el-link></el-menu-item>
      <el-menu-item style="color: #333333" index="3" ><el-link @click="goHref('/ProblemStatus')" >提交状态</el-link></el-menu-item>
         <el-menu-item style="color: #333333" index="5" ><el-link type="success" @click="goHref('/ShowProblem')" >题目详情</el-link></el-menu-item>
         <el-menu-item style="color: #333333" index="6" ><el-link type="success" @click="goSubmit(problemId)" >提交代码</el-link></el-menu-item>
         <el-menu-item style="color: #333333" index="4" ><el-link @click="goCenter()" >个人中心</el-link></el-menu-item>
      </el-menu>
    <div class="line"></div>
  </el-header>
    <el-container>
      <el-container>
        <el-main>
          <div>
            <h1 class="word-v-middle" style="width:100%;font-size: 40px;display: block;text-align: center;">{{articless.title}}</h1>
            <div class="word-v-middle" style="width:50%;font-size: 20px;display: inline-block;height: 45px;text-align: end;line-height: 45px;">时间限制：</div>
            <div class="word-v-middle" v-html="articless.timelimit" style="font-size: 20px;width:4%;height: 45px;text-align: center;display: inline-block;line-height: 45px;"></div>
            <div class="word-v-middle" style="font-size: 20px;width:46%;display: inline-block;height: 45px;line-height: 45px;">MS</div>
            <div class="word-v-middle" style="font-size: 20px;width:50%;display: inline-block;height: 45px;text-align: end;line-height: 45px;">空间限制：</div>
            <div class="word-v-middle" v-html="articless.memorylimit" style="font-size: 20px;width:5%;height: 45px;text-align: center;display: inline-block;line-height: 45px;"></div>
            <div class="word-v-middle" style="font-size: 20px;width:45%;display: inline-block;height: 45px;line-height: 45px;">KB</div>
            <h3 style="font-family: '楷体'; font-size: 25px;">题目描述：</h3>
            <div v-html="articless.description"style="font-family: '楷体'; font-size: 20px;"></div>
            <h3 style="font-family: '楷体'; font-size: 25px;">输入描述：</h3>
            <div v-html="articless.inputdescription" style="font-family: '楷体'; font-size: 20px;"></div>
            <h3 style="font-family: '楷体'; font-size: 25px;">输出描述：</h3>
            <div v-html="articless.outputdescription" style="font-family: '楷体'; font-size: 20px;"></div>
            <h3 style="font-family: '楷体'; font-size: 25px;">输入样例：</h3>
            <div v-html="articless.inputsample" style="font-family: '楷体'; font-size: 20px;"></div>
            <h3 style="font-family: '楷体'; font-size: 25px;">输出样例：</h3>
            <div v-html="articless.outputsample" style="font-family: '楷体'; font-size: 20px;"></div>
            <h3 style="font-family: '楷体'; font-size: 25px;" v-if="articless.hint!==''">提示/说明：</h3>
            <div v-html="articless.hint" style="font-family: '楷体'; font-size: 20px;"></div>
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
        axios.get('http://121.37.137.154:8181//account/findById/'+_this.$store.state.userId).then(function (resp){
            _this.account=resp.data;
          console.log(resp)
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
    axios.get('http://121.37.137.154:8181//problem/findById/'+this.$route.query.id).then(function (resp){
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
.background {
  background-color: #B3C0D1;
  background-size: 100% 100%;
  left: 0;
  top: 0;
  width:100%;
  height:100%;  /**宽高100%是为了图片铺满屏幕 */
  z-index:-1;
  position: fixed;
  /*position: absolute;*/
}
.word-v-middle{
  font-family: "楷体", "楷体_GB2312";
}

</style>