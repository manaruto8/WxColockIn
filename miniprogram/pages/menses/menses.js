// miniprogram/pages/menses/menses.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dayStyle: [
      { month: "current", day: new Date().getDate(), color: "white", background: "#AAD4F5" }, 
      { month: "current", day: new Date().getDate(), color: "white", background: "#AAD4F5" },
    ],
    mensesIndex: 7,
    cycleIndex: 28
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
    var background ="dayStyle[1].background"
    var dayClick = event.detail.day
    this.setData({
      [day]: event.detail.day,
      [background]:"#84e7d0"
    })

  },

  bindMensesPicker: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      mensesIndex: e.detail.value
    })
  },

  bindCyclePicker: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      cycleIndex: e.detail.value
    })
  },

  setPicker:function(){
    var mensesLenth=15
    var cycleLenth = 100
    var mensesArr = new Array(mensesLenth);
    var cycleArr = new Array(cycleLenth);
    for (var i = 0; i <= cycleLenth; i++) {
      if(i<=15){
        mensesArr[i]=String(i)
      }
      cycleArr[i] = String(i)
    }
    this.setData({
      mensesArray: mensesArr,
      cycleArray: cycleArr
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
    this.setPicker()
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