import {useRef, useEffect} from 'react'
import sceneAnimationConfig from '@/data/sceneAnimationConfig'
import {userInterfaceScene, sceneAnimation, ISceneAnimation}from '@/scene/SceneAnimation'

let SceneAnimation = null
let UiAnimation = null

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
        [SceneAnimation, UiAnimation].forEach((animation) => {
            animation.startAnimation()
        })
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