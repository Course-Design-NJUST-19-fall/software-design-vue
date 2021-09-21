<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-row>
            <el-col :span="14">
              <div style="font-size: 30px">
                题目提交
              </div>
            </el-col>

            <el-col :span="10">
              <div class="grid-content bg-purple-light">
                <el-link href="\ListProblem" >题目练习&nbsp&nbsp</el-link>
                <el-link href="\ShowProblem" >返回题目详情&nbsp&nbsp</el-link>
                <el-link href="\SelfCenter" target="_blank">个人中心</el-link>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <br>
        <el-main>

          <el-input
              type="textarea"
              placeholder="请输入代码"
              v-model="textarea"
              :rows="17"
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
      textarea: ''
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

</style>