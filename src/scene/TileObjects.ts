import sceneAnimationConfig from '@/data/sceneAnimationConfig'
import tilesMap from '@/data/tilesMap'
interface ITileObject {
    interact() : void
}
class Tile {
    static tilesWidth = sceneAnimationConfig.defaultTilesWidth
    static tilesHeight = sceneAnimationConfig.defaultTilesHeight
    static resizedTileSize = 0
    static getResizedTileSize(ctx : CanvasRenderingContext2D) {
        const originTilesWidth = sceneAnimationConfig.defaultTileWidthHeight * sceneAnimationConfig.defaultTilesWidth
        const scaleFactor =  ctx.canvas.width / originTilesWidth 
        Tile.resizedTileSize = sceneAnimationConfig.defaultTileWidthHeight * scaleFactor
    }
    static arrayReshapeByTilesWidth(TilesMap : number[]) {
        const reshapedArr = []
        for (let i=0;i<TilesMap.length;i+=Tile.tilesWidth) {
            const row = []
            for (let j=0;j<Tile.tilesWidth;j++) {
                if (i + j > TilesMap.length)
                    break
                row.push(TilesMap[i + j])
            }
            reshapedArr.push(row)
        }
        return reshapedArr
    }
}

class Fence implements ITileObject {
    tilesMap : number[][] = [[]]
    // debug property
    twoD_tilesMap : number[][] = [[]]
    constructor() {
        this.initTilesMap()
    }
    initTilesMap() : void {
        // reshape linear array to 2d array
        this.twoD_tilesMap = Tile.arrayReshapeByTilesWidth(tilesMap.data)
        // console.log(this.twoD_tilesMap)
    }
    draw(ctx : CanvasRenderingContext2D) {
        // ctx.fillStyle = 'rgba(0, 0, 0, 0.0)'
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        // to do: collision setup, tiles size and position calculation... rough done
        // to do: optimize build collision steps
        for (let i=0;i<this.twoD_tilesMap.length;i++) {
            const row = this.twoD_tilesMap[i]
            for (let j=0;j<row.length;j++) {
                const block = row[j]
                if (block != 0)
                    ctx.fillRect(j * Tile.resizedTileSize, i * Tile.resizedTileSize, Tile.resizedTileSize, Tile.resizedTileSize)
            }
        }
    }
    interact() : void {}
}

const TileObjects = {
    tileInfo: Tile,
    fences: new Fence()
}
export default TileObjects