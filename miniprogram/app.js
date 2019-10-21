//app.js

App({
  globalData:({
    _openid:"",
   userInfo:{},
   state:true,
   openid:''
  }),
  onLaunch: function () {
    
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}
    var that = this
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        that.globalData.openid = res.result.openid;
      }
    })
  }
})
