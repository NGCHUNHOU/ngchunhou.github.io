import sceneAnimationConfig from '@/data/sceneAnimationConfig'
import {RefObject} from 'react'
import Player from './Player'
import TileObjects from './TileObjects'

interface ISceneAnimation {
    startAnimation() : void
    initAssets(ctx : RefObject<HTMLCanvasElement>) : void
}
class userInterfaceScene implements ISceneAnimation {
    ctx : CanvasRenderingContext2D | null = null
    constructor() {}
    initAssets(ctx : RefObject<HTMLCanvasElement>) {
        if (!ctx.current)
            throw new Error("failed to get target canvas to render animation")

        let context = ctx.current.getContext("2d")
        this.ctx = context
    }
    initCanvasSize(width : number, height: number) {
        this.ctx.canvas.width = width
        this.ctx.canvas.height = height
    }
    startAnimation() {
        // test code
        // this.ctx.rect(20, 20, 200, 200)
        // this.ctx.stroke()
    }
}
class sceneAnimation implements ISceneAnimation {
    ctx : CanvasRenderingContext2D | null = null
    sprite : HTMLImageElement
    player : Player
    constructor() {}
    initSceneConfig() {
        TileObjects.tileInfo.setResizedTileSize(this.ctx)
        this.player.setPosition(sceneAnimationConfig.playerDefaultPosition[0], sceneAnimationConfig.playerDefaultPosition[1])
    }
    initAssets(ctx : RefObject<HTMLCanvasElement>) {
        if (!ctx.current)
            throw new Error("failed to get target canvas to render animation")

        let context = ctx.current.getContext("2d")
        this.ctx = context

        this.sprite = new Image()
        this.sprite.src = sceneAnimationConfig.backgroundSheetPath
        this.player = new Player(sceneAnimationConfig.playerSheetPath)

        this.initSceneConfig()
    }
    initCanvasSize() {
        this.ctx.canvas.width = this.sprite.width;
        this.ctx.canvas.height = this.sprite.height;
    }
    renderScreen()  {
        // this.ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
        // this.sprite.onload = async () => {
        //     const isOk = await Promise.all([this.initGrassLand(), this.initTrees(15)])
        // }
        // requestAnimationFrame(this.renderScreen.bind(this))

        // scene animation screen still in planning, so blacken this screen first
        // this.ctx.fillStyle = "black"
        // this.ctx.fillRect(0, 0, this.ctx.canvas.width,  this.ctx.canvas.height)

        // this.ctx.drawImage(this.player.sprite, 0, 0, 80, 120, this.player.posx, this.player.posy, 80*this.player.scaleFactor, 120*this.player.scaleFactor)
        // this.ctx.drawImage(this.player.sprite, this.player.getFrameWidth(), 0, 66, 120, this.player.posx, this.player.posy, 80*this.player.scaleFactor, 120*this.player.scaleFactor)
        if (this.ctx != null) {
            this.ctx.clearRect(0,0, this.ctx.canvas.width,  this.ctx.canvas.height)
            this.player.setTilePosition(this.ctx.canvas)

            const playerXVisionStart = this.player.currentTilePos[0] - 1
            const playerXVisionEnd = this.player.currentTilePos[0] + 1
            const playerYVisionStart = this.player.currentTilePos[1] - 1
            const playerYVisionEnd = this.player.currentTilePos[1] + 1

            const topBlock = TileObjects.collision.twoD_tilesMap[playerYVisionStart][playerXVisionStart+1]
            const bottomBlock = TileObjects.collision.twoD_tilesMap[playerYVisionEnd][playerXVisionStart+1]
            const leftBlock = TileObjects.collision.twoD_tilesMap[playerYVisionStart+1][playerXVisionStart]
            const rightBlock = TileObjects.collision.twoD_tilesMap[playerYVisionStart+1][playerXVisionEnd]

            if (topBlock != 0) {
                this.player.keysPressed.set('w', false)
            }
            if (bottomBlock != 0) {
                this.player.keysPressed.set('s', false)
            }
            if (leftBlock != 0) {
                this.player.keysPressed.set('a', false)
            }
            if (rightBlock != 0) {
                this.player.keysPressed.set('d', false)
            }

            if (this.player.keysPressed.get("w")) {
                if (this.player.keysPressed.get("a")) {
                    this.player.goUpLeft();
                } else if (this.player.keysPressed.get("d")) {
                    this.player.goUpRight();
                } else {
                    this.player.goUp();
                }
            }

            if (this.player.keysPressed.get("s")) {
                if (this.player.keysPressed.get("a")) {
                    this.player.goDownLeft();
                } else if (this.player.keysPressed.get("d")) {
                    this.player.goDownRight();
                } else {
                    this.player.goDown();
                }
            }

            if (this.player.keysPressed.get("a")) {
                this.player.goLeft();
            }

            if (this.player.keysPressed.get("d")) {
                this.player.goRight();
            }

            this.ctx.drawImage(this.sprite, 0, 0, this.sprite.width, this.sprite.height)
            this.ctx.drawImage(this.player.sprite, this.player.getFrameWidth(), this.player.getFrameHeight(), this.player.widthSizeInCanvas, this.player.heightSizeInCanvas, this.player.getPlayerPosX(), this.player.getPlayerPosY(), 80*this.player.scaleFactor, 120*this.player.scaleFactor)
            // TileObjects.collision.draw(this.ctx)
        }
        requestAnimationFrame(this.renderScreen.bind(this))
    }
    makePlayerMove() {
        if (this.ctx != null)
            this.player.setTilePosition(this.ctx.canvas)

        const handleKeyDown = (e: KeyboardEvent) => {
            this.player.keysPressed.set(e.key, true);
        };

        const handleKeyUp = (e : KeyboardEvent) => {
            this.player.keysPressed.set(e.key, false);
            this.player.restoreIdleFramePos()
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
    }
    startAnimation() {
        this.makePlayerMove()
    }
}
export {userInterfaceScene, sceneAnimation}
export type {ISceneAnimation}
