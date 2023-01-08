/**
 * 游戏基础的精灵类
 */
export default class Sprite {
  constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0, degree = 0, scale = 1) {
    this.img = new Image()
    this.img.src = imgSrc

    let that = this
    if (width == 0) that.width = that.img.width
    else this.width = width
    if (height == 0) that.height = that.img.height
    else this.height = height

    this.x = x
    this.y = y
    this.degree = degree //增加一个角度属性
    this.scale = scale

    this.visible = true
  }

  /**
   * 将精灵图绘制在canvas上
   */
  drawToCanvas(ctx) {
    if (!this.visible) return

    ctx.save() //保存当前状态
    // 将旋转与绘制中心设置至精灵图预计中心位置
    ctx.scale(this.scale, this.scale)
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2)
    // 旋转画布
    ctx.rotate(this.degree * Math.PI / 180)
    // this.degree++  //让精灵图旋转起来，查看效果

    ctx.drawImage(
      this.img,
      -this.width / 2, // 将精灵图绘制到预定位置
      -this.height / 2,
      this.width,
      this.height
    )
    ctx.restore() //恢复之前的状态
  }

  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * TODO 在地图外不进行碰撞检测
   * @param{Sprite} sp: Sptite的实例
   */
  isCollideWith(sp) {
    const spX = sp.x + sp.width / 2
    const spY = sp.y + sp.height / 2

    if (!this.visible || !sp.visible) return false

    return !!(spX >= this.x
      && spX <= this.x + this.width
      && spY >= this.y
      && spY <= this.y + this.height)
  }
  setImgSrc(imgSrc, width = 0, height = 0) {
    this.img = new Image()
    this.img.src = imgSrc
    let that = this
    this.img.onload = function () {
      if (width == 0) that.width = that.img.width
      else this.width = width
      if (height == 0) that.height = that.img.height
      else this.height = height
    }
  }
}
