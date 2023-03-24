import {useRef, useEffect} from 'react'
import sceneAnimationConfig from '@/data/sceneAnimationConfig'

class sceneAnimation {
    ctx : CanvasRenderingContext2D
    sprite : any = null
    constructor(ctx : CanvasRenderingContext2D) {
        this.ctx = ctx
    }
    initAssetImages() {
        const {spriteSheetPath, canvasWidthPercent, canvasHeightSize} = sceneAnimationConfig
        this.ctx.canvas.width = document.documentElement.clientWidth * canvasWidthPercent
        this.ctx.canvas.height = canvasHeightSize

        let sprite = new Image()
        sprite.src = spriteSheetPath
        this.sprite = sprite

    }
    initGrassLand() {
        return new Promise((resolve, reject) => {
            const tilexSize = 16
            const tileySize = 16
            const maxOffset = 6
            for (let i=0;i<70;i++) {
                for (let j=0;j<40;j++) {
                    const xOffset = (Math.random() * maxOffset - maxOffset / 2)
                    const yOffset = (Math.random() * maxOffset - maxOffset / 2)
                    const xPos = Math.floor(tilexSize * i + xOffset) + 0.5
                    const yPos = Math.floor(tileySize * j + yOffset) + 0.5
                    this.ctx.drawImage(this.sprite, 0, 111, tilexSize, tileySize, xPos, yPos, tilexSize, tileySize)
                }
            }
            resolve(1)
        })
    }
    initTrees(amount: number) {
        const treePosx = 50
        const treePosy = 0
        return new Promise((resolve, reject) => {
            for (let i=0;i<amount;i++) {
                this.ctx.drawImage(this.sprite, treePosx, treePosy, 50, 96, Math.random() * this.ctx.canvas.width, Math.random() * this.ctx.canvas.height, 50, 96)
            }
            resolve(1)
        })

    }
    renderScreen()  {
        // this.ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
        // this.sprite.onload = async () => {
        //     const isOk = await Promise.all([this.initGrassLand(), this.initTrees(15)])
        // }
        // requestAnimationFrame(this.renderScreen.bind(this))

        // scene animation screen still in planning, so blacken this screen first
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0, 0, this.ctx.canvas.width,  this.ctx.canvas.height)
    }
}

function Frame() {
    const sceneAnimationRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!sceneAnimationRef.current)
            throw new Error("failed to get target canvas to render animation")

        let canvas = sceneAnimationRef.current
        let context = canvas.getContext("2d")
        let SceneAnimation : sceneAnimation

        if (context != null) {
            SceneAnimation = new sceneAnimation(context)
            SceneAnimation.initAssetImages()
            SceneAnimation.renderScreen()
        }
    })

    return (
        <>
            <div id="mainFrame" className="absolute top-20 w-full">
                <div className="w-4/5 mx-auto ring ring-green-800 rounded">
                    <canvas ref={sceneAnimationRef} id="sceneAnimation"></canvas>
                </div>
            </div>
        </>
    )

}
export default Frame