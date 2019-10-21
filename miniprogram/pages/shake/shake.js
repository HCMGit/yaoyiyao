// var total_micro_second = 3600 * 1000*24;//这是一天倒计时
var total_micro_second = 10 * 1000;//这是10秒倒计时
Page({

  /**
   * 页面的初始数据
   */
  data: {
    days: [[0, 1, 1, 0, 0, 0, 0], 
    [1, 1, 0, 1, 1, 0, 1]],
     hours: [[0, 1, 1, 0, 0, 0, 0], 
     [1, 1, 0, 1, 1, 0, 1]],
      minutes: [[0, 1, 1, 0, 0, 0, 0],
       [1, 1, 0, 1, 1, 0, 1]],
        seconds: [[0, 1, 1, 0, 0, 0, 0], 
        [1, 1, 0, 1, 1, 0, 1]],
         Millisecond: [[0, 1, 1, 0, 0, 0, 0],
          [1, 1, 0, 1, 1, 0, 1]],
    
    roomid:'',
    x:0,
    y:0,
    z:0,
    lastX:0,
    lastY:0,
    lastZ:0,
    shakeSpeed:110,
    lastTime:0,
   starttime:0,
   sum:0,
    clock: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    /*this.setData({
      starttime:new Date().getTime()
    })
    var that=this;
    wx.onAccelerometerChange(function(res){
      var nowTime = new Date().getTime(); //记录当前时间
      if(nowTime-this.data.starttime>10000){
           wx.stopAccelerometer({
             
           })
      }
      //如果这次摇的时间距离上次摇的时间有一定间隔 才执行
      if (nowTime - that.data.lastTime > 100) {
        var diffTime = nowTime - that.data.lastTime; //记录时间段
        that.data.lastTime = nowTime; //记录本次摇动时间，为下次计算摇动时间做准备
        that.data.x = res.x; //获取 x 轴数值，x 轴为垂直于北轴，向东为正
        that.data.y = res.y; //获取 y 轴数值，y 轴向正北为正
        that.data.z = res.z; //获取 z 轴数值，z 轴垂直于地面，向上为正
        //计算 公式的意思是 单位时间内运动的路程，即为我们想要的速度
        var speed = Math.abs(that.data.x + that.data.y + that.data.z - that.data.lastX - that.data.lastY - that.data.lastZ) / diffTime * 10000;
      }
      if(speed>that.data.shakeSpeed){
        that.setData({
          sum:sum+1
        })
      console.log(speed)
      }
      that.setData({
        lastX:res.x,
        lastY:res.y,
        lastZ:res.z
      })
    })*/
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
    var digitSegments = [
      [1, 1, 1, 1, 1, 1, 0],
     [0, 1, 1, 0, 0, 0, 0], [1, 1, 0, 1, 1, 0, 1],
      [1, 1, 1, 1, 0, 0, 1], [0, 1, 1, 0, 0, 1, 1],
       [1, 0, 1, 1, 0, 1, 1], [1, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1],
         [1, 1, 1, 1, 0, 1, 1],];
    setInterval(function () {
     /*倒计时开始*/      var date_start = new Date(); var date_end = new Date('2019-02-01 00:00:00:00'); var time_end = date_end.getTime(); var time_start = date_start.getTime(); var time = time_end - time_start; var Millisecond = Math.floor(time % 1000); var seconds = Math.floor(time / 1000 % 60); var minutes = Math.floor(time / 1000 / 60 % 60); var hours = Math.floor(time / 1000 / 60 / 60 % 24); var days = Math.floor(time / 1000 / 60 / 60 / 24);    /*倒计时结束*/      let _days = []; let _hours = []; let _minutes = []; let _seconds = []; let _Millisecond = []; _days[0] = digitSegments[(Math.floor(days / 10))]; _days[1] = digitSegments[(days % 10)]; _hours[0] = digitSegments[(Math.floor(hours / 10))]; _hours[1] = digitSegments[(hours % 10)]; _minutes[0] = digitSegments[(Math.floor(minutes / 10))]; _minutes[1] = digitSegments[(minutes % 10)]; _seconds[0] = digitSegments[(Math.floor(seconds / 10))]; _seconds[1] = digitSegments[(seconds % 10)]; _Millisecond[0] = digitSegments[(Math.floor(Millisecond / 100))]; _Millisecond[1] = digitSegments[(Millisecond % 10)]; that.setData({ days: _days, hours: _hours, minutes: _minutes, seconds: _seconds, Millisecond: _Millisecond });
    }, 10) 
   
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