import sceneAnimationConfig from '@/data/sceneAnimationConfig'
import tilesMap from '@/data/tilesMap'
import { Game_Item } from "@/data_structure/world_tree"

interface ITileObject {
    interact() : void
}
class Tile {
    tilesWidth = sceneAnimationConfig.defaultTilesWidth
    tilesHeight = sceneAnimationConfig.defaultTilesHeight
    resizedTileSize = 0
    setResizedTileSize(ctx : CanvasRenderingContext2D) {
        const originTilesWidth = sceneAnimationConfig.defaultTileWidthHeight * sceneAnimationConfig.defaultTilesWidth
        const scaleFactor =  ctx.canvas.width / originTilesWidth
        this.resizedTileSize = sceneAnimationConfig.defaultTileWidthHeight * scaleFactor
    }
    arrayReshapeByTilesWidth(TilesMap : number[]) {
        const reshapedArr = []
        for (let i=0;i<TilesMap.length;i+=this.tilesWidth) {
            const row = []
            for (let j=0;j<this.tilesWidth;j++) {
                if (i + j > TilesMap.length)
                    break
                row.push(TilesMap[i + j])
            }
            reshapedArr.push(row)
        }
        return reshapedArr
    }
}

class Collision implements ITileObject {
    tilesMap : number[][] = [[]]
    // debug property
    twoD_tilesMap : number[][] = [[]]
    base_tile : Tile
    constructor(tile : Tile) {
        this.base_tile = tile
        this.initTilesMap(tile)
    }
    initTilesMap(tile : Tile) : void {
        // reshape linear array to 2d array
        this.twoD_tilesMap = this.base_tile.arrayReshapeByTilesWidth(tilesMap.data)
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
              if (block != 0) {
                  ctx.fillRect(j * this.base_tile.resizedTileSize, i * this.base_tile.resizedTileSize, this.base_tile.resizedTileSize, this.base_tile.resizedTileSize)
                }
            }
        }
    }
    interact() : void {}
}

// const TileObjects = {
//     tileInfo: Tile,
//     collision: new Collision()
// }
class TileObjects implements Game_Item {
    public tileInfo: Tile = new Tile()
    public collision: Collision = new Collision(this.tileInfo)
    public apply_into_game(): boolean {
      return true
    }
}
export default TileObjects
