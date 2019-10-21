var total_micro_second =  30 * 1000;
/* 毫秒级倒计时 */
function count_down(that) {
  // 渲染倒计时时钟
  that.setData({
    clock: date_format(total_micro_second)
  });

  if (total_micro_second <= 0) {
    that.setData({
      clock: "已经截止"
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

  data: {
    clock: '',
    width: 0,

    height: 0,

    showMask: false

  },

  onLoad: function (options) {
    count_down(this);
    var that = this

    //获取系统信息  

    wx.getSystemInfo({

      //获取系统信息成功，将系统窗口的宽高赋给页面的宽高  

      success: function (res) {

        that.width = res.windowWidth

        that.height = res.windowHeight

        that.setData({

          canvasWidth: res.windowWidth * 0.9 * 0.52,

          canvasHeight: res.windowWidth * 0.9 * 0.52 * 0.9819,

          rightWidth: res.windowWidth * 0.9 * 0.47

        })

      }

    })

  },



  onReady: function () {

    this.drawClock();

    // 每40ms执行一次drawClock()，

    this.interval = setInterval(this.drawClock, 40);

  },





  // 所有的canvas属性以及Math.sin,Math.cos()等涉及角度的参数都是用弧度表示

  // 时钟

  drawClock: function () {

    let _this = this;

    const ctx = wx.createCanvasContext('clock');

    var height = this.height;

    var width = this.width;

    // 设置文字对应的半径

    var R = this.data.canvasWidth / 5;

    ctx.save();

    // 把原点的位置移动到屏幕中间，及宽的一半，高的一半

    ctx.translate(this.data.canvasWidth / 1.83, this.data.canvasHeight / 1.83);



    // 画外框

    function drawBackground() {

      ctx.setStrokeStyle('#4BB5C3');

      // 设置线条的粗细，单位px

      ctx.setLineWidth(8);

      // 开始路径

      ctx.beginPath();

      // 运动一个圆的路径

      // arc(x,y,半径,起始位置，结束位置，false为顺时针运动)

      ctx.arc(0, 0, R * 1.7, 0, 2 * Math.PI, false);

      ctx.closePath();

      // 描出点的路径

      ctx.stroke();

    };

    // 画时钟数

    function drawHoursNum() {

      ctx.setFontSize(20);

      // 圆的起始位置是从3开始的，所以我们从3开始填充数字

      var hours = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];

      hours.forEach(function (hour, i) {

        var rad = (2 * Math.PI / 12) * i;

        var x = R * Math.cos(rad);

        var y = R * Math.sin(rad);

        if (hour == 12) {

          ctx.fillText(hour, x - 11, y + 6);

        } else if (hour == 6) {

          ctx.fillText(hour, x - 5, y + 10);

        } else if (hour == 3) {

          ctx.fillText(hour, x, y + 8);

        } else if (hour == 9) {

          ctx.fillText(hour, x - 10, y + 8);

        }

        else {

          //ctx.fillText(hour, x - 6, y + 6);

        }

      })

    };



    // 画数字对应的点

    function drawdots() {

      for (let i = 0; i < 60; i++) {

        var rad = 2 * Math.PI / 60 * i;

        var x = (R + 15) * Math.cos(rad);

        var y = (R + 15) * Math.sin(rad);

        ctx.beginPath();

        // 每5个点一个比较大

        if (i % 5 == 0) {

          ctx.arc(x, y, 2, 0, 2 * Math.PI, false);

        } else {

          // ctx.arc(x, y, 1, 0, 2 * Math.PI, false);

        }

        ctx.setFillStyle('black');

        ctx.fill();

      }

      ctx.closePath();

    }



    // 画时针

    function drawHour(hour, minute) {

      ctx.setStrokeStyle('#000000');

      // 保存画之前的状态

      ctx.save();

      ctx.beginPath();

      // 根据小时数确定大的偏移

      var rad = 2 * Math.PI / 12 * hour;

      // 根据分钟数确定小的偏移

      var mrad = 2 * Math.PI / 12 / 60 * minute;

      // 做旋转

      ctx.rotate(rad + mrad);

      ctx.setLineWidth(4);

      // 设置线条结束样式为圆

      ctx.setLineCap('round');

      // 时针向后延伸8个px；

      ctx.moveTo(0, 8);

      // 一开始的位置指向12点的方向，长度为R/2

      ctx.lineTo(0, -R / 2);

      ctx.stroke();

      ctx.closePath();

      // 返回画之前的状态

      ctx.restore();

    }



    // 画分针

    function drawMinute(minute, second) {

      ctx.save();

      ctx.beginPath();

      // 根据分钟数确定大的偏移

      var rad = 2 * Math.PI / 60 * minute;

      // 根据秒数确定小的偏移

      var mrad = 2 * Math.PI / 60 / 60 * second;

      ctx.rotate(rad + mrad);

      // 分针比时针细

      ctx.setLineWidth(3);

      ctx.setLineCap('round');

      ctx.moveTo(0, 10);

      // 一开始的位置指向12点的方向，长度为3 * R / 4

      ctx.lineTo(0, -3 * R / 4);

      ctx.stroke();

      ctx.closePath();

      ctx.restore();

    }



    // 画秒针

    function drawSecond(second, msecond) {



      ctx.save();

      ctx.beginPath();

      // 根据秒数确定大的偏移

      var rad = 2 * Math.PI / 60 * second;

      // 1000ms=1s所以这里多除个1000

      var mrad = 2 * Math.PI / 60 / 1000 * msecond;

      ctx.rotate(rad + mrad);

      ctx.setLineWidth(2);

      ctx.setStrokeStyle('#4BB5C3');

      ctx.setLineCap('round');

      ctx.moveTo(0, 12);

      ctx.lineTo(0, -R);

      ctx.stroke();

      ctx.closePath();

      ctx.restore();

    }



    //画出中间那个灰色的圆

    function drawDot() {

      ctx.beginPath();

      ctx.arc(0, 0, 4, 0, 2 * Math.PI, false);

      ctx.setFillStyle('#FFF9E6');

      ctx.setLineWidth(6);

      ctx.setStrokeStyle('#000000');

      ctx.stroke();

      ctx.fill();

      ctx.closePath();

    }

    //画蒙层

    function drawMask() {

      ctx.restore();

      ctx.rect(0, 0, width * 0.5, _this.data.canvasHeight);

      ctx.setFillStyle('rgba(0,0,0,.2)')

      ctx.fill()

    }

    function Clock() {

      // 实时获取各个参数

      var now = new Date();

      var hour = now.getHours();

      var minute = now.getMinutes()

      var second = now.getSeconds();

      var msecond = now.getMilliseconds();

      if (_this.data.showMask) {

        ctx.scale(0.98, 0.98)

      }

      // 依次执行各个方法

      drawBackground();

      drawHoursNum();

      drawdots();

      drawSecond(second, msecond);

      drawHour(hour, minute);

      drawMinute(minute, second);

      drawDot();

      if (_this.data.showMask) {

        drawMask();

      }

      ctx.draw();

    }

    Clock();

  },

  goCountdown() {

    let _this = this;

    _this.setData({

      showMask: true

    })

    setTimeout(function () {

      _this.setData({

        showMask: false

      })

      wx.navigateTo({

        url: '/pages/countdown/countdown',

      })

    }, 200)



  },

  touchstart: function (e) {

    console.log(e)

    this.setData({

      showMask: true

    })

  },

  touchend: function (e) {

    this.setData({

      showMask: false

    })

  }

})
