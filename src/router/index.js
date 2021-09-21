import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Submit from '../views/Submit.vue'
import SelfCenter from '../views/SelfCenter.vue'
import ListProblem from '../views/ListProblem.vue'
import ShowProblem from '../views/ShowProblem.vue'
import SelfCenterAdmin from '../views/SelfCenterAdmin.vue'
import EditMyself from '../views/EditMyself.vue'
import FindMyself from '../views/FindMyself.vue'
import ProblemStatus from '../views/ProblemStatus.vue'
import SelfCenterTeacher from '../views/SelfCenterTeacher.vue'
import HomeworkofStudent from '../views/HomeworkofStudent.vue'
import AllHomework from '../views/AllHomework.vue'
import AddProblem from '../views/AddProblem.vue'
import UserList from '../views/UserList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: {name:"Login"}
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/HomeworkofStudent',
    name: 'HomeworkofStudent',
    component: HomeworkofStudent
  },
  {
    path: '/FindMyself',
    name: 'FindMyself',
    component: FindMyself
  },
  {
    path: '/SelfCenter',
    name: 'SelfCenter',
    component: SelfCenter
  },
  {
    path: '/EditMyself',
    name: 'EditMyself',
    component: EditMyself
  },
  {
    path: '/AddProblem',
    name: 'AddProblem',
    component: AddProblem
  },
  {
    path: '/SelfCenterAdmin',
    name: 'SelfCenterAdmin',
    component: SelfCenterAdmin
  },
  {
    path: '/SelfCenterTeacher',
    name: 'SelfCenterTeacher',
    component: SelfCenterTeacher
  },
  {
    path: '/UserList',
    name: 'UserList',
    component: UserList
  },
  {
    path: '/AllHomework',
    name: 'AllHomework',
    component: AllHomework
  },

  {
    path: '/ListProblem',
    name: 'ListProblem',
    component: ListProblem
  },
  {
    path: '/ShowProblem',
    name: 'ShowProblem',
    component: ShowProblem
  },
  {
    path: '/ProblemStatus',
    name: 'ProblemStatus',
    component: ProblemStatus
  },
  {
    path: '/Submit',
    name: 'Submit',
    component: Submit
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
