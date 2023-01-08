const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const atlas = new Image()
atlas.src = 'images/Common.png'

export default class StartScreen {
  constructor() {
    this.btnAreas = new Array();
    /**
     * 开始按钮区域
     */
    this.btnAreas[0] = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 100 + 80,
      endX: screenWidth / 2 + 50,
      endY: screenHeight / 2 - 100 + 120
    }
    /**
     * 退出按钮区域
     */
    this.btnAreas[1] = {
      startX: screenWidth / 2 - 60,
      startY: screenHeight / 2 - 100 + 130,
      endX: screenWidth / 2 + 60,
      endY: screenHeight / 2 + 70
    }
  }

  renderStartScreen(ctx) {
    ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 200, 300, 400)

    ctx.fillStyle = '#ffffff'
    ctx.font = '20px Arial'

    ctx.fillText(
      '召唤神龙',
      screenWidth / 2 - 40,
      screenHeight / 2 - 125
    )

    /**
     * 绘制开始按钮
     */
    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60,
      screenHeight / 2 - 100 + 80,
      120, 40
    )

    ctx.fillText(
      '开始游戏',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 107
    )

    /**
     * 绘制退出按钮
     */
    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60,
      screenHeight / 2 - 100 + 130,
      120, 40
    )

    ctx.fillText(
      '退出',
      screenWidth / 2 - 20,
      screenHeight / 2 - 100 + 157
    )
  }
}
