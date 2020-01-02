// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'testwebservice',
  traceUser: true,
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  
  return db.collection('task').get().then(res => {
    // res.data 包含该记录的数据
    for (var i = 0; i < res.data.length; i++) {
      var id = res.data[i]._id
      var openId = res.data[i]._openid
      var startTime = res.data[i].startTime
      console.log(id)
      console.log("提醒时间：---" + new Date(startTime).getTime())
      console.log("当前时间：" + Date.now())
      if (new Date(startTime).getTime() - (24 * 3600 * 1000) <= Date.now()) {
        try {
          return new Promise(resolve => {
            console.log("发送消息")
            console.log(id)
            const result = cloud.openapi.subscribeMessage.send({
              touser: openId,
              page: 'pages/record/record',
              data: {
                thing1: {
                  value: '日程提示'
                },
                thing2: {
                  value: startTime
                },
              },
              templateId: 'IiYg4nGyG0SZoi5GcyKesbEhH8IPmjodDW8lSzLXxP0'
            })
            resolve(id)
          }).then(res => {
            db.collection('task').doc(res).remove({
              success: function (res) {
                console.log(res.data)
              }
            })

          })
        } catch (err) {

          return err
        }
      }
    }
  })
  
}