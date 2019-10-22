const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  try {
    return await db.collection(event.roomid).where({
      _openid: event.openid
    })
      .update({
        data: {
          sum: event.sum
        },
      })
  } catch (e) {
    console.error(e)
  }
}