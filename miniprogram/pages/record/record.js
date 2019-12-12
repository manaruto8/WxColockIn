// miniprogram/components/calendar/record/record.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    listdata: [
      {
        text: "1"
      },
      {
        text: "2"
      },
      {
        text: "3"
      }
    ]

  },

  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var date = e.detail.value
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('user').where({
      _openid: app.globalData.userId,
    })
      .get({
        success: function (res) {
          console.log(res.data)
          if(res.data.length<=0){
            db.collection('user').add({
              // data 字段表示需新增的 JSON 数据
              data: {
                // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
                record: [{
                  startTime: date,
                  inteval: 28,
                  avarage: 28,
                }],
              },
              success(res) {
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                console.log(res)
              }
            })
          }else{
            db.collection('user').doc(app.globalData.userId).update({
              data: {     
                records: _.push("222")
              },
              success: function (res) {
                console.log(res.data)
              }
            })
          }
        }
      })

    
    
  },

  addData() {
    console.log(app.globalData.userId)
    const db = wx.cloud.database()


  },

  getData(){
    console.log(app.globalData.userId)
    const db = wx.cloud.database()
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})