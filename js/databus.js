import Pool from './base/pool'

let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if (instance) return instance

    instance = this

    this.pool = new Pool()

    this.reset()
  }

  reset() {
    this.levelScore = [3, 9, 18, 30, 45, 63, 84, 108, 135, 165]
    this.frame = 0
    this.score = 0
    this.playerDegree = 0
    this.playLevel = 1
    this.playerSpeed = 6
    this.elapsedTime = 0
    this.bullets = []
    this.enemys = []
    this.animations = []
    this.gameOver = false
    this.startScreen = true
    this.victoryScreen = false
    this.pause = false //标识暂停状态
  }

  /**
   * 回收敌人，进入对象池
   * 此后不进入帧循环
   */
  removeEnemey(enemy) {
    const temp = this.enemys.shift()

    temp.visible = false

    this.pool.recover('enemy', enemy)
  }

  /**
   * 回收子弹，进入对象池
   * 此后不进入帧循环
   */
  removeBullets(bullet) {
    const temp = this.bullets.shift()

    temp.visible = false

    this.pool.recover('bullet', bullet)
  }
}
