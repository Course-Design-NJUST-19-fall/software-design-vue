<template>

  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-container>
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