<template>
  <div>
    <el-container style="height: 700px; border: 1px solid #eee">
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
        <br>
        <el-main>

          <el-input
              type="textarea"
              placeholder="请输入C/C++类型的代码"
              v-model="textarea"
              :rows="27"
              show-word-limit
              style="width: 100%">
          </el-input>

        </el-main>

        <el-footer>
          <el-button  type="primary">提交代码</el-button>

        </el-footer>

      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Submit",
  data() {
    return {
      textarea: '',
      activeIndex: '6',
      activeIndex2: '6'
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
</style>