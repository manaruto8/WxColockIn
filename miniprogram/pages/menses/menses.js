// miniprogram/pages/menses/menses.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dayStyle: [
      { month: "current", day: new Date().getDate(), color: "white", background: "#AAD4F5" }, 
      { month: "current", day: new Date().getDate(), color: "white", background: "#AAD4F5" },
    ]

  },


  next: function (event) {
    console.log(event.detail);
  },

  prev: function (event) {
    console.log(event.detail);
  },

  dateChange: function (event) {
    console.log(event.detail);
  },

  dayClick: function (event) {
    console.log(event.detail);
    var day = "dayStyle[1].day"
    var color = "dayStyle[1].color"
    var background =" dayStyle[1].background"
    var dayClick = event.detail.day
    this.setData({
      [day]: dayClick,
      [background]:"#84e7d0"
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