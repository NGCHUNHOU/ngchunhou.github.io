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
        if (document.documentElement.clientWidth > 1366 && document.documentElement.clientWidth <= 1920) {
            this.sprite.src = backgroundLargeSheetPath
            this.ctx.canvas.height = canvasHeightSize
            this.player.scaleFactor += 0.2
        }
        if (document.documentElement.clientWidth > 768 && document.documentElement.clientWidth <= 1366) {
            this.sprite.src = backgroundSheetPath
            this.ctx.canvas.height = canvasHeightSize
        }
        if (document.documentElement.clientWidth <= 768) {
            this.sprite.src = backgroundSmallSheetPath
            // ensure sprite is loading
            this.sprite.onload = () => {
                this.ctx.canvas.height = this.sprite.height
                this.player.scaleFactor -= 0.2
            }
        }
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
        this.ctx.drawImage(this.sprite, 0, 0)
        // this.ctx.drawImage(this.player.sprite, 0, 0, 80, 120, this.player.posx, this.player.posy, 80*this.player.scaleFactor, 120*this.player.scaleFactor)
        // this.ctx.drawImage(this.player.sprite, this.player.getFrameWidth(), 0, 66, 120, this.player.posx, this.player.posy, 80*this.player.scaleFactor, 120*this.player.scaleFactor)
        this.ctx.drawImage(this.player.sprite, this.player.getFrameWidth(), this.player.getFrameHeight(), 66, 120, this.player.posx, this.player.posy, 80*this.player.scaleFactor, 120*this.player.scaleFactor)
        TileObjects.tileInfo.getResizedTileSize(this.ctx)
        TileObjects.fences.draw(this.ctx)
        requestAnimationFrame(this.renderScreen.bind(this))
    }
    makePlayerMove() {
        const keysPressed = new Map();
        const handleKeyDown = (e: KeyboardEvent) => {
            keysPressed.set(e.key, true);
            if (keysPressed.get("w")) {
                if (keysPressed.get("a")) {
                    this.player.goUpLeft();
                    return
                }
                if (keysPressed.get("d")) {
                    this.player.goUpRight();
                    return
                }
                this.player.goUp();
            }
            if (keysPressed.get("s")) {
                if (keysPressed.get("a")) {
                    this.player.goDownLeft();
                    return
                }
                if (keysPressed.get("d")) {
                    this.player.goDownRight();
                    return
                }
                this.player.goDown();
            }
            if (keysPressed.get("a")) {
                this.player.goLeft();
            }
            if (keysPressed.get("d")) {
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