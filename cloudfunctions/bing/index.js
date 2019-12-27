// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return new Promise((resolve, reject) => {
    request({
      url: "http://guolin.tech/api/bing_pic",
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
        "token": event.token
      },
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        try {
          resolve(body)
        } catch (e) {
          reject()
        }
      }
    })
  })
}