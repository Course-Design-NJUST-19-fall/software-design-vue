<template>

  <div>
    <el-container style="height: 500px; border: 1px solid #eee">

      <el-container>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1"><el-link href="\Login" target="_blank">登陆界面</el-link></el-menu-item>
          <el-menu-item index="2"><el-link href="\Login" target="_blank">题目列表</el-link></el-menu-item>
          <el-menu-item index="3" ><el-link href="\ProblemStatus" target="_blank">提交状态</el-link></el-menu-item>
          <el-menu-item index="4" ><el-link href="\SelfCenter" target="_blank">个人中心</el-link></el-menu-item>
        </el-menu>
        <div class="line"></div>
        <el-header style="text-align: right; font-size: 12px">
          <el-row>
            <el-col :span="14">
              <div style="font-size: 30px">
                题目详情
              </div>
            </el-col>

            <el-col :span="10">
              <div class="grid-content bg-purple-light">
                <el-link href="\ListProblem" >返回题目练习&nbsp&nbsp</el-link>
                <el-link href="\SelfCenter" target="_blank">个人中心</el-link>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <br>
<el-main>

</el-main>
        <el-footer>
          <el-footer>
            <el-button @click="gotosubmit"  type="primary">提交代码</el-button>
          </el-footer>
        </el-footer>

      </el-container>
    </el-container>
  </div>

</template>

<script>
export default {
  name: "ShowProblem",
  methods:{
    gotosubmit:function(event){
      this.$router.push('/Submit')
    },
  }

}
</script>

<style scoped>

</style>