// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: wxContext.OPENID,
      page: "pages/record/record",
      data: {
        thing1: {
          value: "广州至北京"
        },
        thing2: {
          value: "广州至北京"
        },
      },
      templateId: "IiYg4nGyG0SZoi5GcyKesbEhH8IPmjodDW8lSzLXxP0"
    })
    console.log("----"+result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}