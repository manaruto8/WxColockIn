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
  return db.collection('user').where({
    _openid: wxContext.OPENID,
  }).get().then(res => {
    // res.data 包含该记录的数据
    var startTime=res.data[0].startTime
    console.log(new Date(startTime).getTime() - (24 * 3600 * 1000))
    console.log(Date.now())
    if(new Date(startTime).getTime()-(24*3600*1000)<=Date.now()){
      try {
        return new Promise(resolve => {
          const result =cloud.openapi.subscribeMessage.send({
            touser: wxContext.OPENID,
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
          console.log(res)
        })
      } catch (err) {
      
        return err
      }
    }
  })
  
}