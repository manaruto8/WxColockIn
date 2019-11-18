// miniprogram/pages/clockin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  getImg:function(){
    var arr=[1,2,3,4,5]
    for(var i=0;i<arr.length;i++){
      var num = Math.round(Math.random() * 16) + 1
      if (arr.indexOf(num)!=-1|| num < 1 || num > 17){
        i--
        continue
      }
      var url= "cloud://mawebservice.6d61-mawebservice-1259728751/image/" + num + ".jpg"
      arr.splice(i,1,url)
    }
    this.setData({
      griddata: arr
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
    this.getImg()
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