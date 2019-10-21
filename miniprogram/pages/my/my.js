var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.openid)
    wx.cloud.callFunction({
      name: 'roomquery',
      data: {
        hostid: app.globalData.openid
      },
      success: res => {
        console.log(res)
        carInfoData: res.result.data
      },
      fail: err => {
      },
      complete: () => {

      }
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
   var that=this
    wx.cloud.callFunction({
      name: 'roomquery',
      data: {
        hostid:app.globalData.openid
      },
      success: res => {
        that.setData({
          carInfoData: res.result.data
        })

      },
      fail: err => {
        console.log(err)
      }
    })
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
  },
  roomRemove:function(e){
    const db = wx.cloud.database()
       db.collection('room').doc(e.currentTarget.id).remove({
       success: res => {
         console.log(res)
       }
      })
      this.onShow()
    },
    joinRoom:function(e){
      wx.navigateTo({
        url: '/pages/room/room?roomid=' + e.currentTarget.id + '&hostid=' + e.currentTarget.dataset.hostid + '&lasttime=' + e.currentTarget.dataset.lasttime,
      })
    }
    
})