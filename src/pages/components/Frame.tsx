'use client'
import {useRef, useState, useEffect, MutableRefObject} from 'react'
import {portfolio} from '@/data/sceneAnimationConfig'
import sceneAnimationConfig from '@/data/sceneAnimationConfig'
import {userInterfaceScene, sceneAnimation, ISceneAnimation} from '@/scene/SceneAnimation'
import {World_Tree, Canvas_UI_Widget, Game_Item} from '@/data_structure/world_tree'
import Player from '@/scene/Player'
import TileObjects from '@/scene/TileObjects'

function Frame() {
    function getWidthClassName() {
        const canvasWidthPercent : number = sceneAnimationConfig.canvasWidthPercent
        const tailwindClasses : {[key:string] : string} = {
            "0.2" : "w-1/5",
            "0.4" : "w-2/5",
            "0.5" : "w-6/12",
            "0.6" : "w-3/5",
            "0.8" : "w-4/5",
            "1" : "w-full",
        }
        if (tailwindClasses[canvasWidthPercent.toString()] === undefined)
            return ""
        return tailwindClasses[canvasWidthPercent.toString()]
    }

    const [canvasWidthClassName, setCanvasWidthClassName] = useState(getWidthClassName())

    const sceneAnimationRef = useRef<HTMLCanvasElement | null>(null)
    const userInterfaceRef = useRef<HTMLCanvasElement | null>(null)
    const world_tree = new World_Tree()

    useEffect(() => {
        const background_image = new Image()
        background_image.src = sceneAnimationConfig.backgroundSheetPath

        const tile_objects = new TileObjects()

        world_tree.add_child("game_background_image", new Canvas_UI_Widget(background_image));
        world_tree.add_child("tile_objects", tile_objects);
        world_tree.add_child("current_player", new Player(sceneAnimationConfig.playerSheetPath));

        console.log("Frame:world_tree:42", world_tree)

        const SceneAnimation = new sceneAnimation(sceneAnimationRef as MutableRefObject<HTMLCanvasElement>, new Image(), world_tree);
        const UiAnimation = new userInterfaceScene(userInterfaceRef as MutableRefObject<HTMLCanvasElement>);
        SceneAnimation.initAssets(sceneAnimationRef);
        UiAnimation.initAssets(userInterfaceRef);

        (SceneAnimation.world.get_child("game_background_image") as Canvas_UI_Widget).get_node_image().onload = () => {
              SceneAnimation.initCanvasSize();
              UiAnimation.initCanvasSize((SceneAnimation?.world.get_child("game_background_image") as Canvas_UI_Widget).get_node_image().width as number, (SceneAnimation?.world.get_child("game_background_image") as Canvas_UI_Widget).get_node_image().height as number);

              [SceneAnimation, UiAnimation].forEach((animation) => {
                  animation.startAnimation()
              })
              SceneAnimation.renderScreen()
        }

    }, [])

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
