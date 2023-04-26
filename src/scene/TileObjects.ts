import sceneAnimationConfig from '@/data/sceneAnimationConfig'
interface ITileObject {
    interact() : void
}
class Tile {
    static resizedTileSize = 0
    static getResizedTileSize(ctx : CanvasRenderingContext2D) {
        const tileSize = sceneAnimationConfig.defaultTileWidthHeight
        // to do: get tile scale factor by comparing between ctx initialized width and original background width
        Tile.resizedTileSize = tileSize * 2.04
    }
}

class Fence implements ITileObject {
    tilesModel : number[][] = [[]]
    constructor() {}
    interact(): void {}
    draw(ctx : CanvasRenderingContext2D) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.0)'
        // debug ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        // to do: collision setup, tiles size and position calculation
        for (let i=0;i<49;i++) {
            ctx.fillRect(i * Tile.resizedTileSize, 0 * Tile.resizedTileSize, Tile.resizedTileSize, Tile.resizedTileSize)
        }
    }
}

const TileObjects = {
    tileInfo: Tile,
    fences: new Fence()
}
export default TileObjects