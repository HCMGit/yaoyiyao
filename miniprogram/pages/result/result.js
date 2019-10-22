Page({

  /**
   * 页面的初始数据
   */
  data: {
   nickname:'',
    avatarurl:'',
    sum1:1,
    sum:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    const db = wx.cloud.database()
    console.log(options.roomid)
    db.collection(options.roomid).orderBy('sum', 'desc').limit(1).get({
      success: res => {
        console.log(res)
        that.setData({
          nickname:res.data[0].userInfo.nickName,
          avatarurl: res.data[0].userInfo.avatarUrl,
          sum1:res.data[0].sum,
          sum2:options.sum
        })
      },
      fail:err=>{console.log(err)}
    })
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