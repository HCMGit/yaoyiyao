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
    const db = wx.cloud.database()
    db.collection(e.currentTarget.id).where({
      _openid:app.globalData.openid
    }).get({
      success: res => {
        ////如果用户存在则直接跳转
        if (res.data.length != 0) {
          wx.navigateTo({
            url: '/pages/room/room?roomid=' + e.currentTarget.id + '&hostid=' + e.currentTarget.dataset.hostid + '&lasttime=' + e.currentTarget.dataset.lasttime,
          })
        }
        else{
          ///如果用户不存则添加用户再跳转
               const db=wx.cloud.database()
    db.collection(e.currentTarget.id).add({
       data:{
         _openid:app.globalData._openid,
         sum:0,
         userInfo:app.globalData.userInfo
       }
     }).then(res=>{
     wx.navigateTo({
       url: '/pages/room/room?roomid=' + e.currentTarget.id + '&hostid=' + e.currentTarget.dataset.hostid+'&lasttime='+e.currentTarget.dataset.lasttime,
     })
     })
        }
      }
      })
  },
 ///提交新建房间数据
formsubmit:function(e){
  this.util('close')
  const db=wx.cloud.database()
  db.collection('room').add({
    data:{
    hostid:app.globalData.openid,
    lasttime:e.detail.value.time,
    name:e.detail.value.name,
    state:false,
    max_id:"0000"
    },
    success: res => {
      console.log(res)
      // 在返回结果中会包含新创建的记录的 _id 
      wx.showToast({
         title: '新建房间成功',
        })
       wx.cloud.callFunction({
        name: 'createcollection',
        data: {
          roomid:res._id
        },
        success: res => {
          console.log(res)
        },
        fail: err => {
          console.log(err)
        },
        complete: () => {
        }
      })
   
    }
  })
}
})