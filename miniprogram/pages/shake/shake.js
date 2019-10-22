var app=getApp()
var flag=true
var total_micro_second = 1 * 1000;
/* 毫秒级倒计时 */
function count_down(that) {
  // 渲染倒计时时钟
  that.setData({
    clock: date_format(total_micro_second)
  });

  if (total_micro_second <= 0) {
    that.setData({
      clock: "正在计算结果"
    });
    // timeout则跳出递归
    return;
  }
  setTimeout(function () {
    // 放在最后--
    total_micro_second -= 10;
    count_down(that);
  }, 10)
}

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));

  return hr + ":" + min + ":" + sec + " " + micro_sec;
}

// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum:0,
    roomid:'',
    x:0,
    y:0,
    z:0,
    lastX:0,
    lastY:0,
    lastZ:0,
    shakeSpeed:10,
    lastTime:0,
    starttime:0,
    clock: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  // total_micro_second=options.lasttime*1000
    count_down(this);
    this.setData({
      roomid:options.roomid,
      starttime:new Date().getTime()
    })
    var that=this;
    wx.onAccelerometerChange(function(res){
      var nowTime = new Date().getTime(); //记录当前时间
      //如果这次摇的时间距离上次摇的时间有一定间隔 才执行
      if (nowTime - that.data.lastTime > 100) {
        var diffTime = nowTime - that.data.lastTime; //记录时间段
        that.data.lastTime = nowTime; //记录本次摇动时间，为下次计算摇动时间做准备
        that.data.x = res.x; //获取 x 轴数值，x 轴为垂直于北轴，向东为正
        that.data.y = res.y; //获取 y 轴数值，y 轴向正北为正
        that.data.z = res.z; //获取 z 轴数值，z 轴垂直于地面，向上为正
        //计算 公式的意思是 单位时间内运动的路程，即为我们想要的速度
       
        var speed = Math.abs(that.data.x + that.data.y + that.data.z - that.data.lastX - that.data.lastY - that.data.lastZ) / diffTime * 10000;
        if (speed > that.data.shakeSpeed) {
          that.setData({
            sum:that.data.sum+1
          })
      }
        if (total_micro_second==0&&flag) {
          flag=false
           wx.stopAccelerometer()
        
        ///更新用户的手机摇动次数
          wx.cloud.callFunction({
            name: 'update',
            data: {
              roomid: that.data.roomid,
              openid:app.globalData.openid,
              sum:that.data.sum
            },
          success:res=>{console.log(res)
          //两秒钟后跳转
            var timeOut = setTimeout(function () {
              wx.navigateTo({
                url: '../result/result?sum='+that.data.sum+"&roomid="+that.data.roomid,
              })
            }, 2000)
          },
          fail: err => {
            console.log(err)
          }
        })

         }
      }
      
      that.setData({
        lastX:res.x,
        lastY:res.y,
        lastZ:res.z
      })
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
    
  },
  

})