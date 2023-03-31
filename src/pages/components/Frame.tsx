import {useRef, useEffect} from 'react'
import sceneAnimationConfig from '@/data/sceneAnimationConfig'
import sceneAnimation from './SceneAnimation'

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