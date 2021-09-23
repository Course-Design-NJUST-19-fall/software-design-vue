<template>
  <div>
    <el-container style="border: 1px solid #eee">

        <el-header style="text-align: right; font-size: 12px">
          <el-row>
            <el-col :span="14">
              <div style="font-size: 30px">
                所有平台用户
              </div>
            </el-col>

            <el-col :span="10">
              <div class="grid-content bg-purple-light">
                <el-link @click="goHref('/SelfCenterAdmin')">返回管理中心</el-link>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <br>

          <el-table :data="tableData" style="text-align: center">
            <el-table-column align="center" prop="id" label="用户名"   >
            </el-table-column>
            <el-table-column align="center" prop="sort" label="用户类型" >
            </el-table-column>
<!--            <el-table-column align="center" prop="UserClass" label="用户所在班级" >-->
<!--            </el-table-column>-->
            <el-table-column align="center" prop="phoneNumber" label="用户手机号" >
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.sort!=='管理员'" >
                <el-button @click="check(scope.row)" type="text" size="small">查看详细信息</el-button>
                <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
                </span>
              </template>
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
import axios from "axios";

export default {
  name: "UserList",
  data() {

    return {
      tableData: null,
      total:null
    }
  },
  methods:{
    goHref(href){
      this.$router.push(href);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    page(CurrentPage){
      const _this=this;
      axios.get('http://localhost:8181//account/findAll/'+CurrentPage+'/10').then(function (resp){
            _this.tableData=resp.data.records
            _this.total=resp.data.total
            console.log(_this.tableData)
          }
      )
    },
    del(row){
      const _this=this;
      axios.delete('http://localhost:8181//account/deleteById/'+row.id).then(function (resp) {
            console.log(resp);
            if (resp.data) {
              _this.$message({
                type: 'success',
                message: '已删除用户: ' + row.id
              });
            }
          }
      )
    },
    check(row) {
      this.$router.push({
        path:'/CheckAccount',
        query:{
          id:row.id,
          url:this.$route.path
        }
      })
    },

  },
  created() {
    const _this=this;
    let CurrentPage= this.$route.query.currentPage;
    if(CurrentPage==null)CurrentPage=1;
    axios.get('http://localhost:8181//account/findAll/'+CurrentPage+'/10').then(function (resp){
          _this.tableData=resp.data.records
          _this.total=resp.data.total
          console.log(_this.tableData)
        }
    )
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