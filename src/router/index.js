import Vue from 'vue';
import VueRouter from "vue-router";

const Login = () => import('views/login/Login');
const TeacherHome = ()=> import('views/teacherHome/TeacherHome')
const TopicTable = () => import('views/teacherHome/TopicTable')
const AddThesis = () => import('views/teacherHome/AddThesis')
const EditThesis = () => import('views/teacherHome/EditThesis')
const TeacherInfo = () => import('views/teacherHome/TeacherInfo')
const StudentApply = () => import('views/teacherHome/StudentApply')
const MyStudent = () => import('views/teacherHome/MyStudent')

const StudentHome = () => import('views/studentHome/StudentHome')
const Home = () => import('views/studentHome/Home')
const Select = () => import('views/studentHome/Select')
const ApplySis = () => import('views/studentHome/ApplySis')
const Analyse = () => import('views/studentHome/Analyse')
const EditInfo = () => import('views/studentHome/EditInfo')

const ManagerHome = () => import('views/managerHome/ManagerHome')
const Teacher = () => import('views/managerHome/TeacherInfo')
const StudentInfo = () => import('views/managerHome/StudentInfo')
const ManagerInfo = () => import('views/managerHome/ManagerInfo')
const BatchImport = () => import('views/managerHome/BatchImport')

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
      },
      {
        path: '/teacher/stu-apply',
        name: 'StudentApply',
        component: StudentApply,
      },
      {
        path: '/teacher/my-student',
        name: 'MyStudent',
        component: MyStudent,
      }
    ]
  },
  
  {
    path: '/student',
    component: StudentHome,
    children: [
      {
        path: '/student/home',
        component: Home
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
  },
  {
    path: '/manager',
    component: ManagerHome,
    children: [
      {
        path: '/manager/teacher-info',
        component: Teacher
      },
      {
        path: '/manager/student-info',
        component: StudentInfo
      },
      {
        path: '/manager/manager-info',
        component: ManagerInfo
      },
      {
        path: '/manager/batch-import',
        component: BatchImport
      },
      
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
})


export default router;