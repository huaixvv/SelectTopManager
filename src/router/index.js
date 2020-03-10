import Vue from 'vue';
import VueRouter from "vue-router";

const Login = () => import('views/login/Login');
const TeacherHome = ()=> import('views/teacherHome/TeacherHome')
const TopicTable = () => import('views/teacherHome/TopicTable')
const EditThesis = () => import('views/teacherHome/EditThesis')

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/teacher',
    component: TeacherHome,
    children: [
      {
        path: '/teacher/alltopic',
        name: 'TopicTable',
        component: TopicTable,
      },
      {
        path: '/teacher/edit',
        name: 'EditThesis',
        component: EditThesis,
      },
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
})


export default router;