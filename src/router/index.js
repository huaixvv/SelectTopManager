import Vue from 'vue';
import VueRouter from "vue-router";

const Login = () => import('views/login/Login');
const TeacherHome = ()=> import('views/teacherHome/TeacherHome')
const TopicTable = () => import('views/teacherHome/TopicTable')
const AddThesis = () => import('views/teacherHome/AddThesis')
const EditThesis = () => import('views/teacherHome/EditThesis')
const TeacherInfo = () => import('views/teacherHome/TeacherInfo')

const StudentHome = () => import('views/studentHome/StudentHome')
const Info = () => import('views/studentHome/Info')
const Select = () => import('views/studentHome/Select')
const ApplySis = () => import('views/studentHome/ApplySis')
const Analyse = () => import('views/studentHome/Analyse')
const EditInfo = () => import('views/studentHome/EditInfo')

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
  },
  
  {
    path: '/student',
    component: StudentHome,
    children: [
      {
        path: '/student/info',
        component: Info
      },
      {
        path: '/student/select',
        component: Select
      },
      {
        path: '/student/applysis',
        component: ApplySis
      },
      {
        path: '/student/analyse',
        component: Analyse
      },
      {
        path: '/student/editinfo',
        component: EditInfo
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
})


export default router;