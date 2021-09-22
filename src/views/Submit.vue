<template>
  <div>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-container>
        <el-header>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1"><el-link href="\Main" >主页</el-link></el-menu-item>
            <el-menu-item index="2"><el-link href="\ListProblem" >题目列表</el-link></el-menu-item>
            <el-menu-item index="3" ><el-link href="\ProblemStatus" >提交状态</el-link></el-menu-item>
            <el-menu-item index="4" ><el-link href="\SelfCenter" >个人中心</el-link></el-menu-item>
            <el-menu-item index="5" ><el-link type="success" href="\ShowProblem" >题目详情</el-link></el-menu-item>
            <el-menu-item index="6" ><el-link type="success" href="\Submit" >提交代码</el-link></el-menu-item>
          </el-menu>
          <div class="line"></div>
        </el-header>
        <p style="text-align: center">题目：{{problemId}}</p>
        <p style="text-align: center">代码</p>
        <el-main>
          <div class="main" >
            <codemirror v-model="submitCode" :options="options"></codemirror>
          </div>

        </el-main>
        <el-row>
          <div style="width:45%;display: inline-block;text-align: end;" > <el-button type="primary" round  @click="SubmitCode(submitCode)">提交测评</el-button></div>
          <div style="width:10%;display: inline-block;text-align: end;"></div>
          <div style="width:45%;display: inline-block;" ><el-button type="primary" round @click="goBack()" >返回题目</el-button></div>
        </el-row>
      </el-container>
    </el-container>
  </div>
</template>

<script>
const axios = require('axios');
import {codemirror} from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
// 引入主题,配置后生效
import 'codemirror/theme/monokai.css'
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
        theme: 'monokai', // 指定主题，对应主题库 JS 需要提前引入
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
    SubmitCode(submitCode){
          const _this=this;
          axios.post('http://localhost:8181//problem/judgeProblem/',this.problemId,this.submitCode)
    }
  },
  created() {
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
  height: 430px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>