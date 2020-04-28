import { managerRequest } from "./request";

//管理员登录
export function login(loginName, pwd) {
  return managerRequest({
    url: '/manager/login',
    method: 'post',
    params: {
      loginName,
      pwd
    }
  })
}

//获取管理员
export function getManagerInfo(managerId) {
  return managerRequest({
    url: '/manager/managerinfo',
    method: 'post',
    params: {
      managerId
    }
  })
}


//修改管理员信息
export function editManager(manager) {
  return managerRequest({
    url: '/manager/editmanager',
    method: 'post',
    params: {
      manager
    }
  })
}

//获取所有教师信息
export function getAllTeachers() {
  return managerRequest({
    url: '/manager/allteachers',
    method: 'get',
    params: {
    }
  })
}


//删除教师
export function delTeacher(teacher) {
  return managerRequest({
    url: '/manager/delteacher',
    method: 'post',
    params: {
      teacher
    }
  })
}

//获取学生信息
export function getAllStudents() {
  return managerRequest({
    url: '/manager/allstudents',
    method: 'get',
    params: {
    }
  })
}

//删除学生
export function delStudent(student) {
  return managerRequest({
    url: '/manager/delstudent',
    method: 'post',
    params: {
      student
    }
  })
}
