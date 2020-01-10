// miniprogram/pages/mine/mine.js

var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listdata:[
      {
        text:"日历管理1"
      },
      {
        text: "日历管理2"
      },
      {
        text: "日历记录"
      },{
        text: "日历记录"
      }
    ]

  },


  itemClick: function (options) {
    var text = options.currentTarget.dataset.text
    this.subscribeMsg()
    if (text =="日历管理1"){
      wx.navigateTo({
        url: '../period/period',
      })
    }
    if (text == "日历管理2") {
      wx.navigateTo({
        url: '../menses/menses',
      })
    }
    if (text == "日历记录") {
      wx.navigateTo({
        url: '../record/record',
      })
    }
  },  

  getCloud(e){
    wx.cloud.callFunction({
      // 云函数名称
      name: 'login',
      // 传给云函数的参数
      data: {
      },
      success: function (res) {
        console.log(res.result.openid)
        app.globalData.openId = res.result.openid
        app.globalData.savePicture = res.result.savePicture
      },
      fail: console.error
    })
  },

  subscribeMsg() {
    wx.requestSubscribeMessage({
      tmplIds: ["IiYg4nGyG0SZoi5GcyKesbEhH8IPmjodDW8lSzLXxP0"],
      success(res) {
        console.log(res)
      },
      fail(err) {
        console.log(err)
      }
    })
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
    this.getCloud()
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