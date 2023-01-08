// import { Image } from "../libs/weapp-adapter"

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const atlas = new Image()
atlas.src = 'images/Common.png'

export default class VictoryScreen {
  constructor() {
    this.btnAreas = new Array();
    /**
     * 重新开始按钮区域
     */
    this.btnAreas[0] = {
      startX: screenWidth / 2 - 100,
      startY: screenHeight / 2 + 210,
      endX: screenWidth / 2,
      endY: screenHeight / 2 + 250
    }
    /**
     * 分享分数按钮区域
     */
    this.btnAreas[1] = {
      startX: screenWidth / 2,
      startY: screenHeight / 2 + 210,
      endX: screenWidth / 2 + 100,
      endY: screenHeight / 2 + 250
    }
  }

  renderVictoryScreen(ctx, elapsedTime) {
    let min = Math.trunc(elapsedTime / 60)
    let sec = elapsedTime % 60
    ctx.save()
    ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 200, screenHeight / 2 - 300, 400, 600)

    ctx.textAlign = 'center'
    ctx.fillStyle = '#dc3b3a'
    ctx.font = 'bold 20px Arial'

    ctx.fillText(
      '恭喜你',
      screenWidth / 2,
      screenHeight / 2 - 250
    )

    ctx.fillText(
      '召唤了神龙！',
      screenWidth / 2,
      screenHeight / 2 - 220
    )

    ctx.fillStyle = '#ffffff'
    ctx.font = '20px Arial'
    ctx.fillText('你花了', screenWidth / 2, screenHeight / 2 - 190)
    ctx.fillText((min < 10 ? '0' + min : min) + ":" + (sec < 10 ? '0' + sec : sec), screenWidth / 2, screenHeight / 2 - 160)
    ctx.fillText('成功召唤了神龙！', screenWidth / 2, screenHeight / 2 - 130)

    /**
     * 再来一局按钮
     */
    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 120,
      screenHeight / 2 + 210,
      120, 40
    )

    ctx.fillText(
      '再来一局',
      screenWidth / 2 - 60,
      screenHeight / 2 + 237
    )

    /**
     * 分享分数按钮
     */
    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2,
      screenHeight / 2 + 210,
      120, 40
    )

    ctx.fillText(
      '分享分数',
      screenWidth / 2 + 60,
      screenHeight / 2 + 237
    )

    // this.btnArea = {
    //   startX: screenWidth / 2 - 100,
    //   startY: screenHeight / 2 + 210,
    //   endX: screenWidth / 2,
    //   endY: screenHeight / 2 + 250
    // }
    ctx.restore()
  }

  renderLeaderboardTable(ctx, columns, tableData) {
    ctx.save();
    // ctx.textAlign = 'center'
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 20px Arial'
    const tableConf = {
      tableHeight: 250,
      tableWidth: 255,
      rowHeight: 30,
      headerHight: 30
    };
    ctx.translate(screenWidth / 2 - 125, screenHeight / 2 - 110);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(tableConf.tableWidth, 0);
    ctx.lineWidth = 0.5;
    ctx.closePath();
    ctx.stroke();
    // 第二条横线
    ctx.beginPath();
    ctx.moveTo(0, tableConf.rowHeight);
    ctx.lineTo(tableConf.tableWidth, tableConf.rowHeight);
    ctx.lineWidth = 0.5;
    ctx.stroke();
    ctx.closePath();
    const colWidth = Math.ceil(tableConf.tableWidth / columns.length);
    // 绘制表头文字内容
    for (let index = 0; index < columns.length + 1; index++) {
      if (columns[index]) {
        ctx.fillText(columns[index].label, index * colWidth + 10, 22);
      }
    }
    const row = Math.ceil(tableConf.tableHeight / tableConf.rowHeight);
    const tableDataLen = tableData.length;
    // 画横线
    for (let i = 2; i < row + 2; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * tableConf.rowHeight);
      ctx.lineTo(tableConf.tableWidth, i * tableConf.rowHeight);
      ctx.stroke();
      ctx.closePath();
    }
    // 绘制竖线
    for (let index = 0; index < columns.length + 1; index++) {
      ctx.beginPath();
      ctx.moveTo(index * colWidth, 0);
      ctx.lineTo(index * colWidth, (tableDataLen + 1) * tableConf.rowHeight);
      ctx.stroke();
      ctx.closePath();
    }
    // 填充内容
    ctx.font = '20px Arial'
    const columnsKeys = columns.map((v) => v.key);
    //   ctx.fillText(tableData[0].name, 10, 48);
    for (let i = 0; i < tableData.length; i++) {
      columnsKeys.forEach((keyName, j) => {
        const x = 10 + colWidth * j;
        const y = 22 + tableConf.rowHeight * (i + 1);
        if (tableData[i][keyName]) {
          ctx.fillText(tableData[i][keyName], x, y);
        }
      });
    }
    ctx.restore();
  }
}
