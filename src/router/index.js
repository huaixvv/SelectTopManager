import Vue from 'vue';
import VueRouter from "vue-router";

const Login = () => import('views/login/Login');
const TeacherHome = ()=> import('views/teacherHome/TeacherHome')
const TopicTable = () => import('views/teacherHome/TopicTable')
const AddThesis = () => import('views/teacherHome/AddThesis')
const EditThesis = () => import('views/teacherHome/EditThesis')
const TeacherInfo = () => import('views/teacherHome/TeacherInfo')

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
        path: '/teacher/add',
        name: 'AddThesis',
        component: AddThesis,
      },
      {
        path: '/teacher/edit/:thesisId',
        name: 'EditThesis',
        component: EditThesis
      },
      {
        path: '/teacher/info',
        name: 'TeacherInfo',
        component: TeacherInfo,
        
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
})


export default router;