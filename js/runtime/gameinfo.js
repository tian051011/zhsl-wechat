// import { Image } from "../libs/weapp-adapter"

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const atlas = new Image()
atlas.src = 'images/Common.png'

export default class GameInfo {
  renderGameScore(ctx, remainingScore, level, elapsedTime) {
    let min = Math.trunc(elapsedTime / 60)
    let sec = elapsedTime % 60
    ctx.fillStyle = '#ffffff'
    ctx.font = '20px Arial'

    ctx.fillText(
      "到下一等级还需得分：" + remainingScore,
      50, //10
      70
    )

    ctx.fillText(
      "当前等级：" + level,
      50, //10
      50
    )

    ctx.fillText(
      "已用时间：" + (min < 10 ? '0' + min : min) + ":" + (sec < 10 ? '0' + sec : sec),
      screenWidth / 2 - 80, //10
      screenHeight - 20
    )
  }

  renderGameOver(ctx, elapsedTime) {
    let min = Math.trunc(elapsedTime / 60)
    let sec = elapsedTime % 60
    ctx.save()
    ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 200, 300, 400)

    ctx.textAlign = 'center'
    ctx.fillStyle = '#dc3b3a'
    ctx.font = 'bold 20px Arial'

    ctx.fillText(
      '你失败了！',
      screenWidth / 2,
      screenHeight / 2 - 120
    )

    ctx.fillStyle = '#ffffff'
    ctx.font = '20px Arial'
    ctx.fillText('在这个池塘中', screenWidth / 2, screenHeight / 2 - 100 + 60)
    ctx.fillText('你生存了', screenWidth / 2, screenHeight / 2 - 100 + 90)
    ctx.fillText((min < 10 ? '0' + min : min) + ":" + (sec < 10 ? '0' + sec : sec), screenWidth / 2, screenHeight / 2 - 100 + 120)

    /**
     * 再来一局按钮
     */
    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60,
      screenHeight / 2 - 100 + 130,
      120, 40
    )

    ctx.fillText(
      '再来一局',
      screenWidth / 2,
      screenHeight / 2 - 100 + 157
    )

    /**
     * 分享分数按钮
     */
    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60,
      screenHeight / 2 - 100 + 180,
      120, 40
    )

    ctx.fillText(
      '分享分数',
      screenWidth / 2,
      screenHeight / 2 - 100 + 207
    )

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnArea = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 100 + 130,
      endX: screenWidth / 2 + 50,
      endY: screenHeight / 2 - 100 + 170
    }
    ctx.restore()
  }
}
