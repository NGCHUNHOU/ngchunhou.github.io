import {useRef, useEffect} from 'react'
import {portfolio} from '@/data/sceneAnimationConfig'
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
        "1.0" : "w-full",
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
            <div id="mainFrame" className="absolute top-20 w-11/12 inset-x-0 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10">
                <div id="self-introduction" className="flex flex-col justify-center order-2 sm:order-1 md:order-1 lg:order-1">
                    <div id="introduction-title" className="text-3xl">{portfolio.title}</div>
                    <div id="introduction-description" className="text-xl">{portfolio.jobDescription}</div>
                </div>
                <div className={`${canvasWidthClassName} mx-auto ring ring-green-800 rounded relative order-1 sm:order-2 md:order-2 lg:order-2`}>
                    <canvas ref={userInterfaceRef} id="userInterface" className="w-full absolute"></canvas>
                    <canvas ref={sceneAnimationRef} id="sceneAnimation" className="w-full"></canvas>
                </div>
            </div>
        </>
    )

}
export default Frame