// 云函数入口文件
const cloud = require('wx-server-sdk')
var wxContext
var db
cloud.init({
  env: 'testwebservice',
  traceUser: true,
})

// 云函数入口函数
exports.main = async (event, context) => {
  wxContext = cloud.getWXContext()
  db = cloud.database() 
  return db.collection('task').get()
  .then(res => {
    console.log("firstThen")
    console.log(res)
    // res.data 包含该记录的数据
    var resultArr=new Array()
    for (var i = 0; i < res.data.length; i++) {
      var id = res.data[i]._id
      var openId = res.data[i]._openid
      var startTime = res.data[i].startTime
      var warnTime = new Date(startTime).getTime() - (22 * 3600 * 1000)
      if (Date.now()>=warnTime ) {
        var result = { id: id, openId: openId, startTime: startTime };
        resultArr.push(result)  
      }
    }
    return resultArr
  })
  .then(res => {
    console.log("secondThen")
    console.log(res)
    for (var i = 0; i < res.length; i++) {
      console.log("删除消息：---" + res[i].id)
      db.collection('task').doc(res[i].id).remove({
        success: function (res) {
          console.log("删除成功")
        },
        fail: err => {
          console.log("删除失败")
          console.log(err)
        }
      })
      try {
        return new Promise(resolve => {
          console.log("发送消息：---" + res[i].openId)
          const msgResult = cloud.openapi.subscribeMessage.send({
            touser: res[i].openId,
            page: 'pages/record/record',
            data: {
              thing1: {
                value: '日程提示'
              },
              thing2: {
                value: res[i].startTime
              },
            },
            templateId: 'IiYg4nGyG0SZoi5GcyKesbEhH8IPmjodDW8lSzLXxP0'
          })
          resolve(msgResult)
        }).then(res => {
          console.log("sendMsg")
          console.log(res)
        })
      } catch (err) {
        console.log("msgErr")
        console.log(err)
      }
    }
    console.log(idArry)
    return idArry
  })
}