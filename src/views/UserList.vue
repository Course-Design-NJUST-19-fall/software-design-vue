<template>
  <div>
    <el-container>
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
          <el-menu-item style="color: #333333" index="5" ><el-link @click="goBack()" >返回</el-link></el-menu-item>
        </el-menu>
        <div class="line"></div>

      </el-header>
          <el-table :data="tableData" style="text-align: center">
            <el-table-column align="center" prop="id" label="用户名"  >
            </el-table-column>
            <el-table-column align="center" prop="sort" label="用户类型" >
            </el-table-column>
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
    goBack(){
      this.$router.push('/SelfCenterAdmin');
    },
    goHref(href){
      this.$router.push(href);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    page(CurrentPage){
      const _this=this;
      axios.get('http://121.37.137.154:8181//account/findAll/'+CurrentPage+'/10').then(function (resp){
            _this.tableData=resp.data.records
            _this.total=resp.data.total
            console.log(_this.tableData)
          }
      )
    },
    del(row){
      const _this=this;
      axios.delete('http://121.37.137.154:8181//account/deleteById/'+row.id).then(function (resp) {
            console.log(resp);
            if (resp.data) {
              _this.$message({
                type: 'success',
                message: '已删除用户: ' + row.id
              });
              _this.$router.push('/UserList');
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  created() {
    const _this=this;
    let CurrentPage= this.$route.query.currentPage;
    if(CurrentPage==null)CurrentPage=1;
    axios.get('http://121.37.137.154:8181//account/findAll/'+CurrentPage+'/10').then(function (resp){
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


</style>