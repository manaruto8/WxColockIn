// miniprogram/components/calendar/record/record.js

var app = getApp()
const db = wx.cloud.database()
const cmd = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [{
      startTime: "",
      space: "",
    } ],
    lastDateId:0,
    lastDate:0,
    predictStartTime: "",
    predictSpace: "",

  },

  bindDateChange(e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var date = e.detail.value
    var dateId = date.replace(/\-/g, "")
    if(dateId<this.data.lastDateId){
      wx.showToast({
        title: '添加日期需大于最后的日期',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.addOrUpdateData(date, dateId)
  },

  addOrUpdateData(date, dateId) {
    var that = this
    if (!this.data.hasData) {
      db.collection('user').add({
        data: {
          records: [{
            startTime: date,
            space: 28,
          }],
          dates: [dateId],
        },
        success(res) {
          console.log("add:" + res)
          that.getData()
        }
      })
    } else {
      var space = this.getSpaceData(date, this.data.lastDate)
      console.log("update:" + space)
      db.collection('user').where({
        _openid: app.globalData.openId,
      })
        .update({
          data: {
            records: cmd.unshift({
              startTime: date,
              space: space,
            }),
            dates: cmd.unshift(dateId)
          },
          success: function (res) {
            console.log("update:" + res)
            that.getData()
          }
        })
    }
    
  },

  predictData() {
    var spaceAll=0
    if (this.data.listData.length <= 0) {
      return
    }
    for (var i = 0; i < this.data.listData.length;i++){
      spaceAll += this.data.listData[i].space
    }
    var averageSpace = Math.round(spaceAll / this.data.listData.length)
    var predictDate = new Date(this.data.lastDate);
    predictDate.setDate(predictDate.getDate() + averageSpace);
    this.setData({
      predictStartTime: predictDate.getFullYear() + "-" + (predictDate.getMonth() + 1) + "-" + predictDate.getDate(),
      predictSpace: averageSpace,
    })
    this.sendMsg()
  },

  sendMsg() {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'msg',
      // 传给云函数的参数
      data: {
        a: 100000000,
        b: 200000000,
      },
      success: function (res) {
        console.log(res.result)
      },
      fail: console.error
    })
  },

  getSpaceData(sDate1, sDate2) {
    var aDate, oDate1, oDate2, iDays
    aDate = sDate1.split("-")
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) 
    aDate = sDate2.split("-")
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
    return iDays
  },

  getData(){
    var that = this
    console.log(app.globalData.openId)
    db.collection('user').where({
      _openid: app.globalData.openId,
    })
      .get({
        success: function (res) {
          console.log(res.data)
          that.setData({
            hasData: res.data.length <= 0 ? false: true,
            listData: res.data[0].records,
            lastDateId: res.data[0].dates[0],
            lastDate: res.data[0].records[0].startTime
          })
          that.predictData()
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
    this.getData()
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