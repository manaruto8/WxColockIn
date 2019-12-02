// miniprogram/pages/clockin.js
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
          imageUrl:url
        }) 
      }
    })
  },

  getImg:function(){
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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getImg()
    this.getBing()
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