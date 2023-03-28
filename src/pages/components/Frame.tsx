import {useRef, useEffect} from 'react'
import sceneAnimationConfig from '@/data/sceneAnimationConfig'
class Player {
    posx : number = 0
    posy : number = 0
    scaleFactor : number = 0
    sprite : HTMLImageElement
    constructor(spritePath : string) {
        this.sprite = new Image()
        this.sprite.src = spritePath
        this.scaleFactor = sceneAnimationConfig.playerScaleFactor
    }
    setPosition(posx : number, posy : number) {
        this.posx = posx
        this.posy = posy
    }
    goUp() { this.posy-=5 }
    goDown() { this.posy+=5 }
    goLeft() { this.posx-=5 }
    goRight() { this.posx+=5 }
}

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
        const {spriteSheetPath, playerSheetPath, canvasWidthPercent, canvasHeightSize} = sceneAnimationConfig
        this.ctx.canvas.width = document.documentElement.clientWidth * canvasWidthPercent
        this.ctx.canvas.height = canvasHeightSize
        this.sprite.src = spriteSheetPath
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
        this.ctx.drawImage(this.player.sprite, 0, 0, 80, 120, this.player.posx, this.player.posy, 80*this.player.scaleFactor, 120*this.player.scaleFactor)
        requestAnimationFrame(this.renderScreen.bind(this))
    }
    makePlayerMove() {
        const keysPressed = new Map();
        const handleKeyDown = (e: KeyboardEvent) => {
            keysPressed.set(e.key, true);
            if (keysPressed.get("w")) {
                this.player.goUp();
            }
            if (keysPressed.get("a")) {
                this.player.goLeft();
            }
            if (keysPressed.get("s")) {
                this.player.goDown();
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

        // window.addEventListener("keypress", (e) => {
        //     switch (e.key) {
        //         case 'w':
        //             this.player.goUp()
        //             break;
        //         case 'a':
        //             this.player.goLeft()
        //             break;
        //         case 's':
        //             this.player.goDown()
        //             break;
        //         case 'd':
        //             this.player.goRight()
        //             break;
        //         default:
        //             break;
        //     }
        // })
    }
}

function getWidthClassName() {
    const canvasWidthPercent : number = sceneAnimationConfig.canvasWidthPercent
    const tailwindClasses : {[key:string] : string} = {
        "0.2" : "w-1/5",
        "0.4" : "w-2/5",
        "0.5" : "w-6/12",
        "0.6" : "w-3/5",
        "0.8" : "w-4/5",
    }
    if (tailwindClasses[canvasWidthPercent.toString()] === undefined)
        return ""
    return tailwindClasses[canvasWidthPercent.toString()]
}

function Frame() {
    const sceneAnimationRef = useRef<HTMLCanvasElement>(null)
    const canvasWidthClassName = getWidthClassName()

    useEffect(() => {
        if (!sceneAnimationRef.current)
            throw new Error("failed to get target canvas to render animation")

        let canvas = sceneAnimationRef.current
        let context = canvas.getContext("2d")
        let SceneAnimation : sceneAnimation

        if (context != null) {
            SceneAnimation = new sceneAnimation(context)
            SceneAnimation.initSceneConfig()
            SceneAnimation.renderScreen()
            SceneAnimation.makePlayerMove()
        }
    })

    return (
        <>
            <div id="mainFrame" className="absolute top-20 w-full">
                <div className={`${canvasWidthClassName} mx-auto ring ring-green-800 rounded`}>
                    <canvas ref={sceneAnimationRef} id="sceneAnimation"></canvas>
                </div>
            </div>
        </>
    )

}
export default Frame