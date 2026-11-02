import sceneAnimationConfig from '@/data/sceneAnimationConfig'
import {MutableRefObject, RefObject} from 'react'
import Player from './Player'
import TileObjects from './TileObjects'
import {World_Tree, Canvas_UI_Widget} from '@/data_structure/world_tree'

interface ISceneAnimation {
    startAnimation() : void
    initAssets(ctx : RefObject<HTMLCanvasElement>) : void
}
class userInterfaceScene implements ISceneAnimation {
    ctx : CanvasRenderingContext2D
    constructor(ctx : MutableRefObject<HTMLCanvasElement>) {
        if (ctx.current === null) {
          throw new Error(`userInterfaceScene(${ctx.current}): missing HTMLCanvasElement from useRef`)
        } else {
          this.ctx = ctx.current.getContext("2d") as CanvasRenderingContext2D
        }
    }
    initAssets(ctx : RefObject<HTMLCanvasElement>) : void {
        // let context = ctx.current?.getContext("2d") as CanvasRenderingContext2D
        // this.ctx = context
    }
    initCanvasSize(width : number, height: number) {
        this.ctx.canvas.width = width
        this.ctx.canvas.height = height
    }
    startAnimation() {
        // test code
        // this.ctx.rect(20, 20, 200, 200)
        // this.ctx.stroke()
    }
}
class sceneAnimation implements ISceneAnimation {
    ctx : CanvasRenderingContext2D
    world: World_Tree
    constructor(ctx : MutableRefObject<HTMLCanvasElement>, img: HTMLImageElement, world: World_Tree) {
        if (ctx.current === null) {
          throw new Error(`sceneAnimation(${ctx.current}): missing HTMLCanvasElement from useRef`)
        } else {
          this.ctx = ctx.current.getContext("2d") as CanvasRenderingContext2D
        }
        this.world = world
    }
    initAssets(ctx : RefObject<HTMLCanvasElement>) {
        (this.world.get_child("tile_objects") as TileObjects).tileInfo.setResizedTileSize(this.ctx);
        (this.world.get_child("current_player") as Player).setPosition(sceneAnimationConfig.playerDefaultPosition[0], sceneAnimationConfig.playerDefaultPosition[1]);
    }
    initCanvasSize() {
        this.ctx.canvas.width = (this.world.get_child("game_background_image") as Canvas_UI_Widget).get_node_image().width;
        this.ctx.canvas.height = (this.world.get_child("game_background_image") as Canvas_UI_Widget).get_node_image().height;
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

        // this.ctx.drawImage(this.player.sprite, 0, 0, 80, 120, this.player.posx, this.player.posy, 80*this.player.scaleFactor, 120*this.player.scaleFactor)
        // this.ctx.drawImage(this.player.sprite, this.player.getFrameWidth(), 0, 66, 120, this.player.posx, this.player.posy, 80*this.player.scaleFactor, 120*this.player.scaleFactor)
        if (this.ctx != null) {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
           (this.world.get_child("current_player") as Player).setTilePosition(this.ctx.canvas);

            const playerXVisionStart = (this.world.get_child("current_player") as Player).currentTilePos[0] - 1
            const playerXVisionEnd = (this.world.get_child("current_player") as Player).currentTilePos[0] + 1
            const playerYVisionStart = (this.world.get_child("current_player") as Player).currentTilePos[1] - 1
            const playerYVisionEnd = (this.world.get_child("current_player") as Player).currentTilePos[1] + 1

            const topBlock = (this.world.get_child("tile_objects") as TileObjects).collision.twoD_tilesMap[playerYVisionStart][playerXVisionStart+1]
            const bottomBlock = (this.world.get_child("tile_objects") as TileObjects).collision.twoD_tilesMap[playerYVisionEnd][playerXVisionStart+1]
            const leftBlock = (this.world.get_child("tile_objects") as TileObjects).collision.twoD_tilesMap[playerYVisionStart+1][playerXVisionStart]
            const rightBlock = (this.world.get_child("tile_objects") as TileObjects).collision.twoD_tilesMap[playerYVisionStart+1][playerXVisionEnd]

            if (topBlock != 0) {
                (this.world.get_child("current_player") as Player).keysPressed.set('w', false)
            }
            if (bottomBlock != 0) {
                (this.world.get_child("current_player") as Player).keysPressed.set('s', false)
            }
            if (leftBlock != 0) {
                (this.world.get_child("current_player") as Player).keysPressed.set('a', false)
            }
            if (rightBlock != 0) {
                (this.world.get_child("current_player") as Player).keysPressed.set('d', false)
            }

            if ((this.world.get_child("current_player") as Player).keysPressed.get("w")) {
                if ((this.world.get_child("current_player") as Player).keysPressed.get("a")) {
                    (this.world.get_child("current_player") as Player).goUpLeft();
                } else if ((this.world.get_child("current_player") as Player).keysPressed.get("d")) {
                    (this.world.get_child("current_player") as Player).goUpRight();
                } else {
                    (this.world.get_child("current_player") as Player).goUp();
                }
            }

            if ((this.world.get_child("current_player") as Player).keysPressed.get("s")) {
                if ((this.world.get_child("current_player") as Player).keysPressed.get("a")) {
                    (this.world.get_child("current_player") as Player).goDownLeft();
                } else if ((this.world.get_child("current_player") as Player).keysPressed.get("d")) {
                    (this.world.get_child("current_player") as Player).goDownRight();
                } else {
                    (this.world.get_child("current_player") as Player).goDown();
                }
            }

            if ((this.world.get_child("current_player") as Player).keysPressed.get("a")) {
                (this.world.get_child("current_player") as Player).goLeft();
            }

            if ((this.world.get_child("current_player") as Player).keysPressed.get("d")) {
                (this.world.get_child("current_player") as Player).goRight();
            }


            this.ctx.drawImage((this.world.get_child("game_background_image") as Canvas_UI_Widget).get_node_image(), 0, 0, (this.world.get_child("game_background_image") as Canvas_UI_Widget).get_node_image().width, (this.world.get_child("game_background_image") as Canvas_UI_Widget).get_node_image().height)
            this.ctx.drawImage((this.world.get_child("current_player") as Player).sprite, (this.world.get_child("current_player") as Player).getFrameWidth(), (this.world.get_child("current_player") as Player).getFrameHeight(), (this.world.get_child("current_player") as Player).widthSizeInCanvas, (this.world.get_child("current_player") as Player).heightSizeInCanvas, (this.world.get_child("current_player") as Player).getPlayerPosX(), (this.world.get_child("current_player") as Player).getPlayerPosY(), 80*(this.world.get_child("current_player") as Player).scaleFactor, 120*(this.world.get_child("current_player") as Player).scaleFactor)
            // TileObjects.collision.draw(this.ctx)
        }
        requestAnimationFrame(this.renderScreen.bind(this))
    }
    makePlayerMove() {
        if (this.ctx != null)
            (this.world.get_child("current_player") as Player).setTilePosition(this.ctx.canvas)

        const handleKeyDown = (e: KeyboardEvent) => {
            (this.world.get_child("current_player") as Player).keysPressed.set(e.key, true);
        };

        const handleKeyUp = (e : KeyboardEvent) => {
            (this.world.get_child("current_player") as Player).keysPressed.set(e.key, false);
            (this.world.get_child("current_player") as Player).restoreIdleFramePos()
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
    }
    startAnimation() {
        this.makePlayerMove()
    }
}
export {userInterfaceScene, sceneAnimation}
export type {ISceneAnimation}
