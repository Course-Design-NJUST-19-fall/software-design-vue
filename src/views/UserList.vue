<template>
  <div>
    <el-container style="border: 1px solid #eee">
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
          <el-menu-item style="color: #333333" index="4" ><el-link @click="goCenter()" >个人中心</el-link></el-menu-item>
          <el-menu-item style="color: #333333" index="5" > <el-link @click="goExit()" >退出账号</el-link></el-menu-item>
        </el-menu>
        <div class="line"></div>

      </el-header>
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


.background {
  left: 0;
  top: 0;
  width:100%;
  height:100%;  /**宽高100%是为了图片铺满屏幕 */
  z-index:-1;
  position: absolute;
}


</style>