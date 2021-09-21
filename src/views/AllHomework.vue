<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-row>
            <el-col :span="14">
              <div style="font-size: 30px">
                过去所有作业
              </div>
            </el-col>

            <el-col :span="10">
              <div class="grid-content bg-purple-light">
                <el-link href="\SelfCenterTeacher" >返回个人中心</el-link>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <br>

        <el-main>
          <el-table :data="tableData" style="text-align: center">
            <el-table-column align="center" prop="num" label="序号"   >
            </el-table-column>
            <el-table-column align="center" prop="HomeworkId" label="作业编号"   >
            </el-table-column>
            <el-table-column align="center" prop="content" label="作业内容" >
            </el-table-column>
            <el-table-column align="center" prop="FinishStudent" label="学生完成情况" >
            </el-table-column>

          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "AllHomework",
  data() {
    const item = {
      num:'1',
      HomeworkId: '8282828',
      content: '12,22,41,10086',
      FinishStudent:'66%'
    };
    return {
      tableData: Array(20).fill(item)
    }
  },
  methods:{

    deleteRow(index, rows) {
      rows.splice(index, 1);
    }
  }

}
</script>

<style scoped>

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
  bottom: 1px;
  width:100%;
  height:500px;
}

.el-aside {
  color: #333;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  align-self: center;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  align-self: center;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
  align-self: center;
}

.el-col{
  text-align: right;

}

.el-footer{
  position:absolute;
  color:#fff;
  bottom: 100px;
  width:100%;
  height:100px;
  line-height:10px;
  text-align:center;
  background-color: white;
}
</style>