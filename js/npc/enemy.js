import Animation from '../base/animation'
import DataBus from '../databus'

const ENEMY_IMG_SRC = 'images/evoChain/'
const ENEMY_WIDTH = 60
const ENEMY_HEIGHT = 60

const __ = {
  speed: Symbol('speed')
}

const databus = new DataBus()

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Enemy extends Animation {
  constructor() {
    super(ENEMY_IMG_SRC + '1.png', ENEMY_WIDTH, ENEMY_HEIGHT)

    this.initExplosionAnimation()
  }

  init(speed, level) {
    this.setImgSrc(ENEMY_IMG_SRC + level + '.png')
    switch (rnd(0, 4)) {
      case 0:
        this.x = rnd(0, window.innerWidth - this.width)
        this.y = -this.height
        break;
      case 1:
        this.x = -this.width
        this.y = rnd(0, window.innerHeight - this.height)
        break;
      case 2:
        this.x = rnd(0, window.innerWidth - this.width)
        this.y = window.innerHeight + this.height
        break;
      case 3:
        this.x = window.innerWidth + this.width
        this.y = rnd(0, window.innerHeight - this.height)
        break;
      default:
        break;
    }


    this[__.speed] = rnd(1, 3)
    this.degree = rnd(0, 359)

    this.level = level

    this.visible = true
  }

  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    const frames = []

    const EXPLO_IMG_PREFIX = 'images/explosion'
    const EXPLO_FRAME_COUNT = 19

    for (let i = 0; i < EXPLO_FRAME_COUNT; i++) {
      frames.push(`${EXPLO_IMG_PREFIX + (i + 1)}.png`)
    }

    this.initFrames(frames)
  }

  // 每一帧更新子弹位置
  update() {
    this.x -= this[__.speed] * Math.sin(this.degree * Math.PI / 180)
    this.y += this[__.speed] * Math.cos(this.degree * Math.PI / 180)

    // 让玩家与敌人相对运动，产生“玩家在运动”的错觉
    this.x -= databus.playerSpeed * Math.sin(databus.playerDegree * Math.PI / 180)
    this.y += databus.playerSpeed * Math.cos(databus.playerDegree * Math.PI / 180)

    // 对象回收
    // if ((this.x > window.innerWidth + this.width * 2 && this.y > window.innerHeight + this.height * 2) || (this.x < -this.width * 2 && this.y < -this.height * 2)) databus.removeEnemey(this)
  }
}
