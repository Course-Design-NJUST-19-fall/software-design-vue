<template>
  <div>
    <el-container style="height: 800px;">

      <el-header style="background-color: #DCDFE6" >
        <el-menu style="background-color: Transparent"  :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item style="color: #333333" index="1"><el-link @click="goHref('/Main')" >主页</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="2"><el-link @click="goHref('/ListProblem')" >题目列表</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="3" ><el-link @click="goHref('/ProblemStatus')" >提交状态</el-link></el-menu-item>
           <el-menu-item style="color: #333333" index="5" ><el-link @click="goBack()" >题目详情</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="6" ><el-link @click="goHref('/Submit')" >提交代码</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="4" ><el-link @click="goCenter()" >个人中心</el-link></el-menu-item>
        </el-menu>
        <div class="line"></div>
      </el-header>
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
      <div >
        <br>
        <p class="word-v-middle" style="font-size: xx-large;">用户：{{this.$store.state.userId}}</p>
        <br>
        <p class="word-v-middle" style="font-size: xx-large;">题目编号：{{problemId}}</p>
        <br>
      </div>
        <el-main style="overflow: hidden">
            <div class="main">
            <codemirror v-model="submitCode" :options="options"></codemirror>
          </div>
        </el-main>
    </el-container>
    <el-row>
      <div style="width:45%;display: inline-block;text-align: end;" > <el-button type="primary" round  @click="SubmitCode(submitCode)">提交测评</el-button></div>
      <div style="width:10%;display: inline-block;text-align: end;"></div>
      <div style="width:45%;display: inline-block;" ><el-button type="primary" round @click="goBack()" >返回题目</el-button></div>
    </el-row>
  </div>
</template>

<script>
import qs from 'qs'
const axios = require('axios');
import {codemirror} from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
// 引入主题,配置后生效
import 'codemirror/theme/mdn-like.css'
//引入语言,配置后生效
import 'codemirror/mode/clike/clike.js'
export default {
  components: {
    codemirror
  },
  name: "Submit",
  data() {
    return {
      activeIndex: '6',
      activeIndex2: '6',
      //需编辑和显示的内容
      submitCode: '',
      problemId:null,
      // 默认配置
      options: {
        tabSize: 2, // 缩进格式
        theme: 'mdn-like', // 指定主题，对应主题库 JS 需要提前引入
        lineNumbers: true, // 是否显示行号
        indentUnit: 2,
        smartIndent: true,
        //指定语言类型,如果需要编辑和显示其他语言,需要import语言js然后修改此配置
        mode: 'text/x-c++src',
        line: true,
        styleActiveLine: true, // 高亮选中行
        //是否为只读,如果为"nocursor" 不仅仅为只读 连光标都无法在区域聚焦
        readOnly: false,
        hintOptions: {
          completeSingle: true // 当匹配只有一项的时候是否自动补全
        }
      }
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
    goBack() {
      this.$router.push({
        path:'/ShowProblem',
        query:{
          id:this.problemId,
          currentPage:this.fromPage
        }
      })
    },
    SubmitCode(code){
      let loading = this.$loading({
        lock:true,
        text:"提交中，请稍候...",
        background:'rgba(0,0,0,0.5)'
      })
          const _this=this;
          axios.post('http://121.37.137.154:8181//problem/judgeProblem/', {problemId:this.problemId,submitterId:this.$store.state.userId,code:code}).then(function (resp){
                console.log(resp);
                loading.close();
              _this.$message({
               message:"提交成功",
               type:"success"
              })
                _this.$router.push('/ProblemStatus');
          })
    }
  },
  created() {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
    }
    this.problemId=this.$route.query.problemId;
  }
}
</script>

<style scoped>
.el-button{
  align-self: center;
  alignment: center;
  position: center;
}
.el-input{
  min:555px;
  width: 400px;
}
.el-header{
  background: white;
}
.main{
  /*text-align: center;*/
  background-color: #fff;
  border-radius: 10px;
  width: 800px;
  height: 600px;
  margin: auto;
  position: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
  margin-bottom: 0;
  font-size: 10px;
  min-height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10px;
  margin-top: 5px;
  color: black;
  white-space: normal;
  font-family: "楷体", "楷体_GB2312";
}

</style>