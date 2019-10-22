var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
     roomid:'',
     hostid:'',
     lasttime:0,
     userInfo:'',
     userid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.hostid)
      var that=this
      that.setData({
        roomid:options.roomid,
        hostid:options.hostid,
        lasttime:options.lasttime,
        userid: app.globalData.openid
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
    
    wx.cloud.callFunction({
      name: 'menberquery',
      data: {
        roomid:this.data.roomid
      },
      success: res => {
        this.setData({
          menbers: res.result.data
        })
      },
      fail: err => {
        console.log(err)
      },
      complete: () => {

      }
    })

    const db = wx.cloud.database()
    db.collection('room').where({
      roomid: this.data.roomid 
    }).get({
      success: function (res) {
        console.log(res)
        if(res.state){
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    /*const db=wx.cloud.database()
    db.collection("roommenbers").where({
      roomid:this.data.roomid,
      _openid:app.globalData.openid
    }).remove()*/
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
  start:function(){
    const db=wx.cloud.database()
    db.collection('room').doc('roomid').update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        state: true
      }
    })
      .then(
        wx.navigateTo({
          url: '../shake/shake?roomid='+this.data.roomid+"&lasttime="+this.data.lasttime,
        })
      )
      .catch(console.error)
  }

})