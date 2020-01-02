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

 /**
   * 选择日期
   */
  bindDateChange(e) {
    var that = this
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

 /**
   * 数据库添加或者更新日期数据
   */
  addOrUpdateData(date, dateId) {
    var that = this
    if (!this.data.hasData) {
      db.collection('user').add({
        data: {
          records: [{
            startTime: date,
            space: 2,
          }],
          dates: [dateId],
          startTime: "",
          space: "",
        },
        success(res) {
          that.getData()
        }
      })
    } else {
      var space = this.getSpaceData(date, this.data.lastDate)
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
            that.getData()
          }
        })
    }
    
  },

 /**
   * 预测日期及平均间隔
   */
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
    var month = this.addZero((predictDate.getMonth() + 1))
    var day = this.addZero(predictDate.getDate())
    this.setData({
      predictStartTime: predictDate.getFullYear() + "-" +month  + "-" + day,
      predictSpace: averageSpace,
    })
    db.collection('user').where({
      _openid: app.globalData.openId,
    })
      .update({
        data: {
          startTime: this.data.predictStartTime,
          space: this.data.predictSpace,
        },
        success: function (res) {
          
        }
      })
    this.addOrUpdateTask() 
  },

/**
   * 数据库添加或者更新任务数据
   */
  addOrUpdateTask() {
    console.log(this.data.hasTask)
    if (!this.data.hasTask) {
      db.collection('task')
        .add({
          data: {
            startTime: this.data.predictStartTime,
          },
          success: function (res) {
            this.sendMsg()
          }
        })
    }else{
      db.collection('task').where({
        _openid: app.globalData.openId,
      })
        .update({
          data: {
            startTime: this.data.predictStartTime,
          },
          success: function (res) {
            this.sendMsg()
          }
        })
    }
  },

  /**
   * 预测日期不够10补0
   */
  addZero(s) {
    return s < 10 ? '0' + s : s
  },


  /**
   * 发送短信
   */
  sendMsg() {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'msg',
      // 传给云函数的参数
      data: {
      },
      success: function (res) {
        console.log(res)
      },
      fail: console.error
    })
  },

/**
   * 计算日期间隔
   */
  getSpaceData(sDate1, sDate2) {
    var aDate, oDate1, oDate2, iDays
    aDate = sDate1.split("-")
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) 
    aDate = sDate2.split("-")
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
    return iDays
  },

 /**
   * 数据库获取初始化数据
   */
  getData(){
    var that = this
    console.log(app.globalData.openId)
    db.collection('user').where({
      _openid: app.globalData.openId,
    })
      .get({
        success: function (res) {
          that.setData({
            hasData: res.data.length <= 0 ? false: true,
            listData: res.data[0].records,
            lastDateId: res.data[0].dates[0],
            lastDate: res.data[0].records[0].startTime
          })
        }        
      })

    db.collection('task').where({
      _openid: app.globalData.openId,
    })
      .get({
        success: function (res) {
          console.log(res)
          that.setData({
            hasTask: res.data.length <= 0 ? false : true,
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