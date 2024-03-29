import sceneAnimationConfig from "@/data/sceneAnimationConfig"
enum direction {
    vertical = 1,
    horizontal = 2
}
class Player {
    leftOffset : number = 15
    frameWidth = 65
    frameHeight = 130
    widthSizeInCanvas: number = sceneAnimationConfig.playerSizeInCanvas[0]
    heightSizeInCanvas: number = sceneAnimationConfig.playerSizeInCanvas[1]
    currentFramePosX : number = 0
    currentFramePosY : number = 0
    currentTilePos: number[] = [0,0]
    posx : number = 0
    posy : number = 0
    scaleFactor : number = 0
    keysPressed = new Map()
    sprite : HTMLImageElement
    constructor(spritePath : string) {
        this.sprite = new Image()
        this.sprite.src = spritePath
        this.scaleFactor = sceneAnimationConfig.playerScaleFactor
    }
    getFrameWidth(): number {
        return this.leftOffset + (this.currentFramePosX * this.frameWidth)
    }
    getFrameHeight(): number {
        return (this.currentFramePosY * this.frameHeight)
    }
    getPlayerPosX(): number {
        return this.posx - (this.widthSizeInCanvas / 2)
    }
    getPlayerPosY(): number {
        return (this.posy - (this.heightSizeInCanvas / 2))
    }
    setPosition(posx : number, posy : number) {
        this.posx = posx
        this.posy = posy
    }
    setTilePosition(ctx : HTMLCanvasElement) {
        if (!this.posx || !this.posy)
            return false
        
        const xunit = ctx.width / sceneAnimationConfig.defaultTilesWidth
        const yunit = ctx.height / sceneAnimationConfig.defaultTilesHeight
        this.currentTilePos[0] = Math.floor(this.posx / xunit)
        this.currentTilePos[1] = Math.floor(this.posy / yunit)
        return true
    }
    restoreIdleFramePos() { this.currentFramePosX = 0 }
    move(direction: number) {
        let movePosition = 0
        if (direction == 1)
            movePosition = this.posy
        else
            movePosition = this.posx

        if ((movePosition % sceneAnimationConfig.playerFrameSpeed) == 0)
            this.currentFramePosX += 1
        if (this.currentFramePosX > 3)
            this.currentFramePosX = 0
    }
    goUp() { 
        this.currentFramePosY = 2
        this.posy-=sceneAnimationConfig.playerMoveSpeed 
        this.move(direction.vertical)
    }
    goUpLeft() { 
        this.currentFramePosY = 3
        this.posy-=sceneAnimationConfig.playerMoveSpeed 
        this.posx-=sceneAnimationConfig.playerMoveSpeed 
        this.move(direction.vertical)
    }
    goUpRight() { 
        this.currentFramePosY = 1
        this.posy-=sceneAnimationConfig.playerMoveSpeed 
        this.posx+=sceneAnimationConfig.playerMoveSpeed 
        this.move(direction.vertical)
    }
    goDown() { 
        this.currentFramePosY = 0
        this.posy+=sceneAnimationConfig.playerMoveSpeed
        this.move(direction.vertical)
    }
    goDownLeft() { 
        this.currentFramePosY = 3
        this.posy+=sceneAnimationConfig.playerMoveSpeed
        this.posx-=sceneAnimationConfig.playerMoveSpeed 
        this.move(direction.vertical)
    }
    goDownRight() { 
        this.currentFramePosY = 1
        this.posy+=sceneAnimationConfig.playerMoveSpeed
        this.posx+=sceneAnimationConfig.playerMoveSpeed 
        this.move(direction.vertical)
    }
    goLeft() { 
        this.currentFramePosY = 3
        this.posx-=sceneAnimationConfig.playerMoveSpeed 
        this.move(direction.horizontal)
    }
    goRight() { 
        this.currentFramePosY = 1
        this.posx+=sceneAnimationConfig.playerMoveSpeed 
        this.move(direction.horizontal)
    }
}
export default Player
