import Sprite from '../base/sprite'
import Bullet from './bullet'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/evoChain/'

const databus = new DataBus()

export default class Player extends Sprite {
  constructor() {
    super(PLAYER_IMG_SRC + '1.png')

    // 玩家默认处于屏幕居中位置
    this.x = screenWidth / 2 - this.width / 2
    this.y = screenHeight / 2 - this.height / 2

    // 用于在手指移动的时候标识手指是否已经触摸了
    this.touched = false

    this.lastLevel = 0

    this.bullets = []

    // 初始化事件监听
    this.initEvent()
  }

  /**
   * 当手指触摸屏幕的时候
   * 判断手指是否在角色上
   * @param {Number} x: 手指的X轴坐标
   * @param {Number} y: 手指的Y轴坐标
   * @return {Boolean}: 用于标识手指是否在角色上的布尔值
   */
  checkIsFingerOnAir(x, y) {
    const deviation = 30

    return !!(x >= this.x - deviation
      && y >= this.y - deviation
      && x <= this.x + this.width + deviation
      && y <= this.y + this.height + deviation)
  }

  /**
   * 根据手指的位置设置角色的位置
   * 保证手指处于角色中间
   * 同时限定角色的活动范围限制在屏幕中
   */
  setAirPosAcrossFingerPosZ(x, y) {
    let disX = x - this.width / 2
    let disY = y - this.height / 2

    if (disX < 0) disX = 0

    else if (disX > screenWidth - this.width) disX = screenWidth - this.width

    if (disY <= 0) disY = 0

    else if (disY > screenHeight - this.height) disY = screenHeight - this.height

    this.x = disX
    this.y = disY
  }

  /**
   * 玩家响应手指的触摸事件
   * 改变角色的位置
   */
  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      const x = e.touches[0].clientX
      const y = e.touches[0].clientY

      //判断玩家是否点击了暂停图标
      if (x >= 10 && x <= 40 && y >= 35 && y <= 65) {
        databus.pause = !databus.pause
        return
      }
      if (databus.gameOver || databus.startScreen || databus.pause || databus.victoryScreen) return
      //   if (this.checkIsFingerOnAir(x, y)) {
      //     this.touched = true

      //     this.setAirPosAcrossFingerPosZ(x, y)
      //   }
      if (!this.touched) this.degree = Math.atan2(this.y - y, this.x - x) * (180 / Math.PI) + 100
      databus.playerDegree = this.degree - 180
      if(this.lastLevel != databus.playLevel){
        console.log(PLAYER_IMG_SRC + databus.playLevel + '.png')
        this.setImgSrc(PLAYER_IMG_SRC + databus.playLevel + '.png')
      }
      this.x = screenWidth / 2 - this.width / 2
      this.y = screenHeight / 2 - this.height / 2
      this.lastLevel = databus.playLevel

    }))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()

      const x = e.touches[0].clientX
      const y = e.touches[0].clientY

      if (databus.gameOver || databus.startScreen || databus.pause || databus.victoryScreen) return
      if (!this.touched) this.degree = Math.atan2(this.y - y, this.x - x) * (180 / Math.PI) + 100
      databus.playerDegree = this.degree - 180
      if(this.lastLevel != databus.playLevel){
        console.log(PLAYER_IMG_SRC + databus.playLevel + '.png')
        this.setImgSrc(PLAYER_IMG_SRC + databus.playLevel + '.png')
      }
      this.x = screenWidth / 2 - this.width / 2
      this.y = screenHeight / 2 - this.height / 2
      this.lastLevel = databus.playLevel

      // if (this.touched) this.setAirPosAcrossFingerPosZ(x, y)
    }))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()

      this.touched = false
      databus.playerDegree = 0
    }))
  }

  /**
   * 玩家射击操作
   * 射击时机由外部决定
   */
  shoot() {
    const bullet = databus.pool.getItemByClass('bullet', Bullet)

    bullet.init(
      this.x + this.width / 2 - bullet.width / 2,
      this.y + this.height / 2 - bullet.height / 2,
      5,
      this.degree
    )

    databus.bullets.push(bullet)
  }
}
