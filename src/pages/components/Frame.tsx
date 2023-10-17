import {useRef, useEffect} from 'react'
import sceneAnimationConfig from '@/data/sceneAnimationConfig'
import {userInterfaceScene, sceneAnimation, ISceneAnimation}from '@/scene/SceneAnimation'

let SceneAnimation: sceneAnimation | null = null
let UiAnimation: userInterfaceScene | null = null

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
    const userInterfaceRef = useRef<HTMLCanvasElement>(null)
    const canvasWidthClassName = getWidthClassName()

    useEffect(() => {
        SceneAnimation = new sceneAnimation(sceneAnimationRef);
        UiAnimation = new userInterfaceScene(userInterfaceRef);
        SceneAnimation.sprite = new Image()
        SceneAnimation.sprite.src = sceneAnimationConfig.backgroundSheetPath

        SceneAnimation.sprite.onload = () => {
            if (SceneAnimation !== null) {
                if (SceneAnimation.ctx !== null) {
                    SceneAnimation.ctx.canvas.width = SceneAnimation.sprite.width;
                    SceneAnimation.ctx.canvas.height = SceneAnimation.sprite.height;
                }
                if (UiAnimation !== null) {
                    if (UiAnimation.ctx != null) {
                        UiAnimation.ctx.canvas.width = SceneAnimation.sprite.width;
                        UiAnimation.ctx.canvas.height = SceneAnimation.sprite.height;
                    }
                }
                [SceneAnimation, UiAnimation].forEach((animation) => {
                    if (animation !== null)
                        animation.startAnimation()
                })
                SceneAnimation.renderScreen()
            }
        }

    })

    return (
        <>
            <div id="mainFrame" className="absolute top-20 w-full">
                <div className={`${canvasWidthClassName} mx-auto ring ring-green-800 rounded relative`}>
                    <canvas ref={userInterfaceRef} id="userInterface" className="w-full absolute"></canvas>
                    <canvas ref={sceneAnimationRef} id="sceneAnimation" className="w-full"></canvas>
                </div>
            </div>
        </>
    )

}
export default Frame