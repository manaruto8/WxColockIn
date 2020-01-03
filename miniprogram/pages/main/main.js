// miniprogram/pages/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backUrl: "cloud://testwebservice.7465-testwebservice-1259728751/images/1.jpg"
  },
/**
   * 获取必应图片
   */
  getBing () {
    var that=this
    wx.request({
      url: "http://guolin.tech/api/bing_pic",
      success(res){
        that.setData({
          //backUrl: res.data
        }) 
        that.getTempImg(that.data.backUrl)
      }
    })
  },

/**
   * 获取图片列表
   */
  getImg(){
    var that = this
    var arr=[1,2,3,4,5,6]
    var urlArr = ["cloud://testwebservice.7465-testwebservice-1259728751/images/1.jpg",
                  "cloud://testwebservice.7465-testwebservice-1259728751/image/2.jpg",
                  "cloud://testwebservice.7465-testwebservice-1259728751/image/3.jpg",
                  "cloud://testwebservice.7465-testwebservice-1259728751/image/4.jpg",
                  "cloud://testwebservice.7465-testwebservice-1259728751/image/5.jpg",
                  "cloud://testwebservice.7465-testwebservice-1259728751/image/6.jpg"]
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


/**
   * 获取经纬度
   */
  getLocation () {
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
    this.getTempImg(url)
  },  


  selectClick: function (options) {
    var that=this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths[0]
        that.setData({
          backUrl: tempFilePaths
        })
        that.getCanvas(tempFilePaths)
      }
    })
  },

  /**
  * 获取图片真实链接并保存
  */
  getTempImg(url) {
    var that = this
    wx.cloud.downloadFile({
      fileID: url,
      success: res => {
        console.log("save---")
        console.log(res)
        that.getCanvas(res.tempFilePath)
      },
      fail: err => {
        console.log("save err---")
      }
    })
  },
  
/**
   * 生成分享图片
   */
  getCanvas(img) {
    var canvasId ="myCanvas"
    var ctx = wx.createCanvasContext(canvasId)
    var text = this.data.textInput
    var lacation=this.data.locationInput
    var that = this
    wx.getImageInfo({
      src: img,
      success: function (res) {
        var width = res.width
        var height = res.height
        let screenWidth = wx.getSystemInfoSync().windowWidth
        if (width > screenWidth) {
          width = screenWidth
        }
        height = height / res.width * width
        console.log(width+"---"+height)
        ctx.drawImage(img, 0, 0, width, height)
        ctx.setFontSize(20)
        ctx.setFillStyle("white")
        ctx.fillText("hhhh", 150, 150)
        ctx.draw(false,function(){
          wx.canvasToTempFilePath({
            canvasId: canvasId,
            success: (res) => {
              console.log("temp---") 
              console.log(res) 
              that.setData({
                tempPath: res.tempFilePath
              })   
            },
            fail: (e) => {
              console.log("temp err---")
              console.log(e)
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
    wx.saveImageToPhotosAlbum({
      filePath: that.data.tempPath,
      success: (file) => {
        console.log("file---")
        console.log(file)
      },
      fail: (e) => {
        console.log("file err---")
        console.log(e)
      }
    }) 
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