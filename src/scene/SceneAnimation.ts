import sceneAnimationConfig from '@/data/sceneAnimationConfig'
import Player from './Player'
import TileObjects from './TileObjects'

class sceneAnimation {
    ctx : CanvasRenderingContext2D
    sprite : HTMLImageElement
    player : Player
    constructor(ctx : CanvasRenderingContext2D) {
        this.ctx = ctx
        this.sprite = new Image()
        this.player = new Player(sceneAnimationConfig.playerSheetPath)
    }
    initSceneConfig() {
        const {backgroundSheetPath, backgroundLargeSheetPath, backgroundSmallSheetPath, canvasWidthPercent, canvasHeightSize} = sceneAnimationConfig
        this.ctx.canvas.width = document.documentElement.clientWidth * canvasWidthPercent

        this.sprite.src = backgroundSheetPath
        this.sprite.onload = () => {
            this.ctx.canvas.width = this.sprite.width
            this.ctx.canvas.height = this.sprite.height
        }
        // if (document.documentElement.clientWidth > 1366 && document.documentElement.clientWidth <= 1920) {
        //     this.sprite.src = backgroundLargeSheetPath
            // this.ctx.canvas.width = 1750
            // this.ctx.canvas.height = 1400
        //     this.player.scaleFactor += 0.2
        // }
        // if (document.documentElement.clientWidth > 768 && document.documentElement.clientWidth <= 1366) {
        //      this.sprite.src = backgroundSheetPath
        //      this.ctx.canvas.height = canvasHeightSize
        // }
        // if (document.documentElement.clientWidth <= 768) {
        //     this.sprite.src = backgroundSmallSheetPath
        //     // ensure sprite is loading
        //     this.sprite.onload = () => {
        //         this.ctx.canvas.width = this.sprite.width
        //         this.ctx.canvas.height = this.sprite.height
        //         this.player.scaleFactor -= 0.2
        //     }
        // }
        TileObjects.tileInfo.getResizedTileSize(this.ctx)
        this.player.setPosition(sceneAnimationConfig.playerDefaultPosition[0], sceneAnimationConfig.playerDefaultPosition[1])
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

        this.ctx.clearRect(0,0, this.ctx.canvas.width,  this.ctx.canvas.height)
        this.ctx.drawImage(this.sprite, 0, 0, this.sprite.width, this.sprite.height)
        // this.ctx.drawImage(this.player.sprite, 0, 0, 80, 120, this.player.posx, this.player.posy, 80*this.player.scaleFactor, 120*this.player.scaleFactor)
        // this.ctx.drawImage(this.player.sprite, this.player.getFrameWidth(), 0, 66, 120, this.player.posx, this.player.posy, 80*this.player.scaleFactor, 120*this.player.scaleFactor)
        this.ctx.drawImage(this.player.sprite, this.player.getFrameWidth(), this.player.getFrameHeight(), this.player.widthSizeInCanvas, this.player.heightSizeInCanvas, this.player.getPlayerPosX(), this.player.getPlayerPosY(), 80*this.player.scaleFactor, 120*this.player.scaleFactor)
        // TileObjects.fences.draw(this.ctx)
        requestAnimationFrame(this.renderScreen.bind(this))
    }
    makePlayerMove() {
        this.player.setTilePosition(this.ctx.canvas)
        const keysPressed = new Map();

        const handleKeyDown = (e: KeyboardEvent) => {
            this.player.setTilePosition(this.ctx.canvas)
            keysPressed.set(e.key, true);
            const playerXVisionStart = Math.abs(this.player.currentTilePos[0] - 1)
            const playerXVisionEnd = Math.abs(this.player.currentTilePos[0] + 1)
            const playerYVisionStart = Math.abs(this.player.currentTilePos[1] - 1)
            const playerYVisionEnd = Math.abs(this.player.currentTilePos[1] + 1)
            let isPlayerTopBlocked = false
            let isPlayerBottomBlocked = false
            let isPlayerLeftBlocked = false
            let isPlayerRightBlocked = false
            const topBlock = TileObjects.collision.twoD_tilesMap[playerYVisionStart][playerXVisionStart+1]
            const bottomBlock = TileObjects.collision.twoD_tilesMap[playerYVisionEnd][playerXVisionStart+1]
            const leftBlock = TileObjects.collision.twoD_tilesMap[playerYVisionStart+1][playerXVisionStart]
            const rightBlock = TileObjects.collision.twoD_tilesMap[playerYVisionStart+1][playerXVisionEnd]
            if (topBlock != 0)
                isPlayerTopBlocked = true
            if (bottomBlock != 0)
                isPlayerBottomBlocked = true
            if (leftBlock != 0)
                isPlayerLeftBlocked = true
            if (rightBlock != 0)
                isPlayerRightBlocked = true

            // console.log("playerXVisionStart", playerXVisionStart)
            // console.log("playerXVisionEnd", playerXVisionEnd)
            // console.log("playerYVisionStart", playerYVisionStart)
            // console.log("playerYVisionEnd", playerYVisionEnd)
            // console.log("isPlayerTopBlocked", isPlayerTopBlocked)
            // console.log("isPlayerBottomBlocked", isPlayerBottomBlocked)
            // console.log("isPlayerLeftBlocked", isPlayerLeftBlocked)
            // console.log("isPlayerRightBlocked", isPlayerRightBlocked)

            if (keysPressed.get("w")) {
                if (keysPressed.get("a")) {
                    if (!isPlayerTopBlocked)
                        this.player.goUpLeft();
                    return
                }
                if (keysPressed.get("d")) {
                    if (!isPlayerTopBlocked)
                        this.player.goUpRight();
                    return
                }
                if (!isPlayerTopBlocked)
                    this.player.goUp();
            }
            if (keysPressed.get("s")) {
                if (keysPressed.get("a")) {
                    if (!isPlayerBottomBlocked)
                        this.player.goDownLeft();
                    return
                }
                if (keysPressed.get("d")) {
                    if (!isPlayerBottomBlocked)
                        this.player.goDownRight();
                    return
                }
                if (!isPlayerBottomBlocked)
                    this.player.goDown();
            }
            if (keysPressed.get("a")) {
                if (!isPlayerLeftBlocked)
                    this.player.goLeft();
            }
            if (keysPressed.get("d")) {
                if (!isPlayerRightBlocked)
                    this.player.goRight();
            }
        };

        const handleKeyUp = (e : KeyboardEvent) => {
            keysPressed.set(e.key, false);
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
    }
}
export default sceneAnimation