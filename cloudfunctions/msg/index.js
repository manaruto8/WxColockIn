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
      var warnTime = new Date(startTime).getTime() - (22 * 3600 * 1000)
      console.log(id)
      console.log("提醒时间：---" + warnTime)
      console.log("当前时间：---" + Date.now())
      if (Date.now()>=warnTime ) {
        try {
          return new Promise(resolve => {
            console.log("发送消息")
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
            resolve(result)
          }).then(res => {
            db.collection('task').doc(id).remove({
              success: function (res) {
                console.log("删除成功")
              }
            })
            console.log(res)
            return res
          })
        } catch (err) {
          console.log(err)
          return err
        }
      }
    }
  })
  
}