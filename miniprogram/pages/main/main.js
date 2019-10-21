var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomid:'',
    showModalStatus: false
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
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;

    wx.cloud.callFunction({
      name: 'roomAllQuery',
      data: {
      },
      success: res => {
       that.setData({
         carInfoData:res.result.data
       })
      },
      fail: err => {
      },
      complete: () => {
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

  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    console.log(e)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例  
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  } ,
  ///加入房间
  joinRoom:function(e){
    console.log(e)
     const db=wx.cloud.database()
     db.collection('roommenbers').add({
       data:{
         _openid:app.globalData._openid,
         shake:0,
         userInfo:app.globalData.userInfo
       }
     }).then(res=>{
     wx.navigateTo({
       url: '/pages/room/room?roomid=' + e.currentTarget.id + '&hostid=' + e.currentTarget.dataset.hostid+'&lasttime='+e.currentTarget.dataset.lasttime,
     })
     })
  },
 ///提交新建房间数据
formsubmit:function(e){
  console.log(e)
  this.util('close')
  const db=wx.cloud.database()
  db.collection('room').add({
    data:{
    hostId:app.globalData.openid,
    lasttime:e.detail.value.time,
    name:e.detail.value.name
    },
    success: res => {
      // 在返回结果中会包含新创建的记录的 _id 
      wx.showToast({
         title: '新建房间成功',
        })
        console.log(res)
    const db=wx.cloud.database()
        db.collection('roomstate').add({
          data:{
            roomId:res._id,
            state:false,
            max_id:'000000'
          },
          success:res=>{console.log(res)}
        })
    }
  })
}
})