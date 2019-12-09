// miniprogram/pages/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  getBing: function () {
    var that=this
    var url = "cloud://mawebservice.6d61-mawebservice-1259728751/image/1.jpg"
    wx.request({
      url: "http://guolin.tech/api/bing_pic",
      success(res){
        url=res.data
        that.setData({
          backUrl: "cloud://mawebservice.6d61-mawebservice-1259728751/image/1.jpg"
        }) 
        that.getTempImg()
      }
    })
  },

  getImg:function(){
    var that = this
    var arr=[1,2,3,4,5]
    var urlArr = ["cloud://mawebservice.6d61-mawebservice-1259728751/image/1.jpg",
                  "cloud://mawebservice.6d61-mawebservice-1259728751/image/2.jpg",
                  "cloud://mawebservice.6d61-mawebservice-1259728751/image/3.jpg",
                  "cloud://mawebservice.6d61-mawebservice-1259728751/image/4.jpg",
                  "cloud://mawebservice.6d61-mawebservice-1259728751/image/5.jpg"]
    for(var i=0;i<arr.length;i++){
      var num = Math.round(Math.random() * 16) + 1
      if (arr.indexOf(num)!=-1|| num < 1 || num > 17){
        i--
        continue
      }
      arr.splice(i, 1, num)
      var url= "cloud://mawebservice.6d61-mawebservice-1259728751/image/" + num + ".jpg"
      urlArr.splice(i,1,url)
    }
    this.setData({
      griddata: urlArr
    }) 
  },

  getTempImg: function () {
    var that = this
    wx.cloud.getTempFileURL({
      fileList: [that.data.backUrl],
      success: res => {
        that.setData({
          tempUrl: res.fileList[0].tempFileURL
        })
        that.getCanvas()
      },
      fail: err => {
        // handle error
      }
    })
  },

  getLocation: function () {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // console.log(res);
        var latitude = res.latitude
        var longitude = res.longitude
        //弹框
        wx.showModal({
          title: '当前位置',
          content: "纬度:" + latitude + ",经度:" + longitude,
        })
      }
    })
  },


  itemClick:function(options){
    var url = options.currentTarget.dataset.url
    this.setData({
      backUrl: url
    })
    this.getTempImg()
  },  

  getCanvas: function () {
    var canvasId ="myCanvas"
    var ctx = wx.createCanvasContext(canvasId)
    var text = this.data.textInput
    var lacation=this.data.locationInput
    var that = this
    wx.getImageInfo({
      src: that.data.tempUrl,
      success: function (res) {
        var width = res.width
        var height = res.height
        //获取屏幕宽度
        let screenWidth = wx.getSystemInfoSync().windowWidth
        //处理一下图片的宽高的比例
        if (width >= height) {
          if (width > screenWidth) {
            width = screenWidth
          }
          height = height / res.width * width
        } else {
          if (width > screenWidth) {
            width = screenWidth
          }
          if (height > 400) {
            height = 400
            width = res.width / res.height * height
          } else {
            height = height / res.width * width
          }
        }
        that.setData({
          imageWidth: width,
          imageHeight: height,
        })
        ctx.drawImage(that.data.tempUrl, 0, 0, width, height)
        ctx.setFontSize(20)
        ctx.setFillStyle("white")
        ctx.fillText("I Love You", 150, 150)
        ctx.draw(false,function(){
          wx.canvasToTempFilePath({
            canvasId: canvasId,
            success: (res) => {    
              wx.saveFile({
                tempFilePath: res.tempFilePath,
                success: (res) => {
                  that.setData({
                    tempPath: res.savedFilePath
                  }) 
                },
                fail: (e) => {              
                }
              })
            
            },
            fail: (e) => {
            }
          })
        })
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
    //this.getLocation()
    this.getImg()
    this.getBing()
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
    var that = this
    console.log("---" + that.data.tempPath)
    return {
      title:"打卡",
      imageUrl: that.data.tempPath
    }
  },

  textInput: function(e) {
    this.setData({
      textInput: e.detail.value
    })
  },

  locationInput:function(e) {
    this.setData({
      locationInput: e.detail.value
    })
  },
})