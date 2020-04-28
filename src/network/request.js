import axios from "axios";

export function studentRequest(config) {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:10086",
    timeout: 3000
  })

  instance.interceptors.request.use(config => {
    return config;
  }, err => {
    console.log(err);
  });

  instance.interceptors.response.use(res => {
    return res;
  }, err => {
      console.log(err);
  })

  return instance(config);
}

//teacher
export function teacherRequest(config) {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:10086",
    timeout: 3000
  })

  instance.interceptors.request.use(config => {
    return config;
  }, err => {
    console.log(err);
  });

  instance.interceptors.response.use(res => {
    return res;
  }, err => {
      console.log(err);
  })
  return instance(config);
}

export function managerRequest(config) {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:10086",
    timeout: 3000
  })

  instance.interceptors.request.use(config => {
    return config;
  }, err => {
    console.log(err);
  });

  instance.interceptors.response.use(res => {
    return res;
  }, err => {
      console.log(err);
  })

  return instance(config);
}


//文件相关
export function fileRequest(config) {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:10086",
    timeout: 3000
  })

  instance.interceptors.request.use(config => {
    return config;
  }, err => {
    console.log(err);
  });

  instance.interceptors.response.use(res => {
    return res;
  }, err => {
      console.log(err);
  })

  return instance(config);
}

