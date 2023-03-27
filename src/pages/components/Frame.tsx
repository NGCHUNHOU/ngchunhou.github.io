import {useRef, useEffect} from 'react'
import sceneAnimationConfig from '@/data/sceneAnimationConfig'

class sceneAnimation {
    ctx : CanvasRenderingContext2D
    sprite : HTMLImageElement
    scenePosx : number = 0
    scenePosy : number = 0
    constructor(ctx : CanvasRenderingContext2D) {
        this.ctx = ctx
        this.sprite = new Image()
    }
    initSceneConfig() {
        const {spriteSheetPath, canvasWidthPercent, canvasHeightSize} = sceneAnimationConfig
        this.ctx.canvas.width = document.documentElement.clientWidth * canvasWidthPercent
        this.ctx.canvas.height = canvasHeightSize
        this.sprite.src = spriteSheetPath
    }
    // initGrassLand() {
    //     return new Promise((resolve, reject) => {
    //         const tilexSize = 16
    //         const tileySize = 16
    //         const maxOffset = 6
    //         for (let i=0;i<70;i++) {
    //             for (let j=0;j<40;j++) {
    //                 const xOffset = (Math.random() * maxOffset - maxOffset / 2)
    //                 const yOffset = (Math.random() * maxOffset - maxOffset / 2)
    //                 const xPos = Math.floor(tilexSize * i + xOffset) + 0.5
    //                 const yPos = Math.floor(tileySize * j + yOffset) + 0.5
    //                 this.ctx.drawImage(this.sprite, 0, 111, tilexSize, tileySize, xPos, yPos, tilexSize, tileySize)
    //             }
    //         }
    //         resolve(1)
    //     })
    // }
    // initTrees(amount: number) {
    //     const treePosx = 50
    //     const treePosy = 0
    //     return new Promise((resolve, reject) => {
    //         for (let i=0;i<amount;i++) {
    //             this.ctx.drawImage(this.sprite, treePosx, treePosy, 50, 96, Math.random() * this.ctx.canvas.width, Math.random() * this.ctx.canvas.height, 50, 96)
    //         }
    //         resolve(1)
    //     })
    // }
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
        // this.sprite.onload = () => {
            this.ctx.drawImage(this.sprite, this.scenePosx, this.scenePosy)
        // }
        requestAnimationFrame(this.renderScreen.bind(this))
    }
    goUp() { this.scenePosy-=5 }
    goDown() { this.scenePosy+=5 }
    goLeft() { this.scenePosx-=5 }
    goRight() { this.scenePosx+=5 }
    enableCameraMovement() {
            window.addEventListener("keypress", (e) => {
                switch (e.key) {
                    case 'w':
                        this.goUp()
                        break;
                    case 'a':
                        this.goLeft()
                        break;
                    case 's':
                        this.goDown()
                        break;
                    case 'd':
                        this.goRight()
                        break;
                    default:
                        break;
                }
            })
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
            SceneAnimation.enableCameraMovement()
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