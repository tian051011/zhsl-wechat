import Player from './player/index'
import Enemy from './npc/enemy'
import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'

import StartScreen from './runtime/start'
import VictoryScreen from './runtime/victory'
import Pause from './runtime/pause'
const ctx = canvas.getContext('2d')
const databus = new DataBus()

function rnd(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
}

/**
 * 游戏主函数
 */
export default class Main {
    constructor() {
        // 维护当前requestAnimationFrame的id
        this.aniId = 0

        this.restart()
    }

    restart() {
        databus.reset()

        canvas.removeEventListener(
            'touchstart',
            this.touchHandler
        )

        this.bg = new BackGround(ctx)
        this.player = new Player(ctx)
        this.gameinfo = new GameInfo()
        this.startScreen = new StartScreen()
        this.victoryScreen = new VictoryScreen()
        this.pause = new Pause()
        this.music = new Music()

        this.bindLoop = this.loop.bind(this)
        this.hasEventBind = false

        clearInterval(this.timer);
        this.timer = setInterval(function () {
            if (!databus.pause && !databus.gameOver && !databus.startScreen && !databus.victoryScreen) {
                databus.elapsedTime += 1
            }
        }, 1000) //自动计时

        // 清除上一局的动画
        window.cancelAnimationFrame(this.aniId)

        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        )

    }

    /**
     * 随着帧数变化的敌机生成逻辑
     * 帧数取模定义成生成的频率
     */
    enemyGenerate() {
        if (databus.frame % 30 === 0) {
            const enemy = databus.pool.getItemByClass('enemy', Enemy)
            enemy.init(1, rnd(databus.playLevel - 2 <= 0 ? 1 : databus.playLevel - 2, databus.playLevel + 3 > 9 ? 9 : databus.playLevel + 3))
            databus.enemys.push(enemy)
        }
    }

    // 全局碰撞检测
    collisionDetection() {
        const that = this

        databus.enemys.forEach((enemy) => {
            for (let i = 0, il = databus.enemys.length; i < il; i++) {
                const enemy2 = databus.enemys[i]

                if (!enemy2.isPlaying && enemy2.isCollideWith(enemy)) {
                    if (enemy.level >= enemy2.level) {
                        // enemy2.playAnimation()
                    } else {
                        // enemy.playAnimation()
                    }

                    break
                }
            }
        })

        for (let i = 0, il = databus.enemys.length; i < il; i++) {
            const enemy = databus.enemys[i]
            // enemy.scale = 0.5

            if (this.player.isCollideWith(enemy)) {
                if (databus.playLevel >= enemy.level) {
                    databus.score += enemy.level
                    enemy.playAnimation()
                } else {
                    databus.gameOver = true
                }

                break
            }
        }
    }

    // 游戏开始界面/结束后的触摸事件处理逻辑
    touchEventHandler(e) {
        e.preventDefault()

        const x = e.touches[0].clientX
        const y = e.touches[0].clientY

        if (databus.gameOver) {
            const area = this.gameinfo.btnArea

            if (x >= area.startX
                && x <= area.endX
                && y >= area.startY
                && y <= area.endY) this.restart()
        } else if (databus.startScreen) {
            const area = this.startScreen.btnArea

            if (x >= area.startX
                && x <= area.endX
                && y >= area.startY
                && y <= area.endY) databus.startScreen = false
        } else if (databus.victoryScreen) {
            const area = this.victoryScreen.btnArea

            if (x >= area.startX
                && x <= area.endX
                && y >= area.startY
                && y <= area.endY) this.restart()

        }
    }

    /**
     * canvas重绘函数
     * 每一帧重新绘制所有的需要展示的元素
     */
    render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.bg.render(ctx)

        databus.bullets
            .concat(databus.enemys)
            .forEach((item) => {
                item.drawToCanvas(ctx)
            })

        this.player.drawToCanvas(ctx)

        databus.animations.forEach((ani) => {
            if (ani.isPlaying) {
                ani.aniRender(ctx)
            }
        })

        if (!databus.gameOver && !databus.startScreen && !databus.victoryScreen) {
            this.pause.renderPauseIcon(ctx, databus.pause)
            this.gameinfo.renderGameScore(ctx, databus.levelScore[databus.playLevel - 1] - databus.score, databus.playLevel, databus.elapsedTime)
        }

        // 游戏结束/游戏未开始停止帧循环
        if (databus.gameOver) {
            this.gameinfo.renderGameOver(ctx, databus.elapsedTime)

            if (!this.hasEventBind) {
                this.hasEventBind = true
                this.touchHandler = this.touchEventHandler.bind(this)
                canvas.addEventListener('touchstart', this.touchHandler)
                console.log("绑定了游戏结束触摸事件")
            }
        } else if (databus.startScreen) {
            this.startScreen.renderStartScreen(ctx) //渲染开始屏幕

            if (!this.hasEventBind) {
                this.hasEventBind = true
                this.touchHandler = this.touchEventHandler.bind(this)
                canvas.addEventListener('touchstart', this.touchHandler) //绑定按钮触摸事件处理
                console.log("绑定了游戏开始触摸事件")
            }
        } else if (databus.victoryScreen) {
            this.victoryScreen.renderVictoryScreen(ctx, databus.score)

            if (!this.hasEventBind) {
                this.hasEventBind = true
                this.touchHandler = this.touchEventHandler.bind(this)
                canvas.addEventListener('touchstart', this.touchHandler) //绑定按钮触摸事件处理
                console.log("绑定了游戏开始触摸事件")
            }
        }
    }

    // 游戏逻辑更新主函数
    update() {
        if (databus.gameOver || databus.startScreen || databus.pause || databus.victoryScreen) return

        // this.bg.update()

        databus.bullets
            .concat(databus.enemys)
            .forEach((item) => {
                item.update()
            })

        this.enemyGenerate()

        this.collisionDetection()

        if (databus.frame % 20 === 0) {
            // this.player.shoot()
            // this.music.playShoot()
        }
        if (databus.score >= databus.levelScore[databus.playLevel - 1]) {
            databus.playLevel += 1
        }
        if (databus.playLevel >= 10) {
            databus.victoryScreen = true
        }
    }

    // 实现游戏帧循环
    loop() {
        databus.frame++

        this.update()
        this.render()

        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        )
    }
}
