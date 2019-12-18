// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: wxContext.OPENID,
      page: 'index',
      data: {
        thing1: {
          value: '提醒'
        },
        thing2: {
          value: '2015年01月05日'
        },
      },
      templateId: 'IiYg4nGyG0SZoi5GcyKesbEhH8IPmjodDW8lSzLXxP0'
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}