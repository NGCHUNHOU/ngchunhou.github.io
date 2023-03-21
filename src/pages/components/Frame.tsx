import {useRef, useEffect} from 'react'
import sceneAnimationConfig from '@/data/sceneAnimationConfig'

class sceneAnimation {
    ctx = null
    sprite = null
    initAssetImages(ctx) {
        this.ctx = ctx
        const {spriteSheetPath} = sceneAnimationConfig
        let sprite = new Image()
        sprite.src = spriteSheetPath
        this.sprite = sprite

    }
    renderScreen()  {
        // this.ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
        // this.ctx.drawImage(this.sprite, 0, 170, 15, 20, 0, 0, 15, 40)
        this.ctx.drawImage(this.sprite, 0, 0, 50, 96, 10, 10, 50, 96)
        requestAnimationFrame(this.renderScreen.bind(this))
    }
}

function Frame() {
    const sceneAnimationRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (sceneAnimationRef.current) {
            let canvas = sceneAnimationRef.current
            let context = canvas.getContext("2d")
            let SceneAnimation = new sceneAnimation()
            SceneAnimation.initAssetImages(context)
            SceneAnimation.renderScreen()
        }
    })

    return (
        <>
            <div id="mainFrame" className="absolute top-20 w-full">
                <canvas ref={sceneAnimationRef} id="sceneAnimation" className="w-10/12 mx-auto ring"></canvas>
            </div>
        </>
    )

}
export default Frame