import Sprite from '../base/sprite'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BULLET_IMG_SRC = 'images/bullet.png'
const BULLET_WIDTH = 16
const BULLET_HEIGHT = 30

const __ = {
  speed: Symbol('speed')
}

const databus = new DataBus()

export default class Bullet extends Sprite {
  constructor() {
    super(BULLET_IMG_SRC, BULLET_WIDTH, BULLET_HEIGHT)
  }

  init(x, y, speed, degree) {
    this.x = x
    this.y = y
    this.degree = degree

    this[__.speed] = speed

    this.visible = true
  }

  // 每一帧更新子弹位置
  update() {
    this.x += this[__.speed] * Math.sin(this.degree * Math.PI / 180)
    this.y -= this[__.speed] * Math.cos(this.degree * Math.PI / 180)

    // 超出屏幕外回收自身
    if ((this.y < -this.height && this.x < -this.width) || (this.y > screenHeight && this.x > screenWidth)) databus.removeBullets(this)
  }
}
