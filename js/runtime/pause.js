// import { Image } from "../libs/weapp-adapter"

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const pauseIcon = [new Image(), new Image()]
pauseIcon[0].src = 'images/icon/pause-outline.png'
pauseIcon[1].src = 'images/icon/pause-solid.png'

export default class Pause {

  renderPauseIcon(ctx, status) {
      if(!status) {
        ctx.drawImage(pauseIcon[0],10,35,30,30)
      } else {
        ctx.drawImage(pauseIcon[1],10,35,30,30)
      }
      this.btnArea = {
        startX: 10,
        startY: 10,
        endX: 40,
        endY: 40
      }
  }
}
