import { fileRequest } from './request';


//删除上次存储的文件
export function delFile(filePath) {
  console.log("filereq", filePath);
  return fileRequest({
    url: '/file/delete',
    method: 'get',
    params: {
      filePath,
    }
  })
}