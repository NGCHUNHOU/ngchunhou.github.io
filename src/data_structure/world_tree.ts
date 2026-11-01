import Player from '../scene/Player'
import { randomUUID } from 'node:crypto'

interface Game_Item {
  // this function should check if it is valid game item
  is_game_item(): boolean
}

class World_Tree {
  public id: string = randomUUID();
  public name: string = "";
  public parentId: string = "";
  public children: Game_Item[] = [];
  public draw(): boolean {
    for (const item of this.children) {
      if (!item.is_game_item()) return false
    }
    return true
  }
}

class Canvas_UI_Widget implements Game_Item {
  private _node: any = null
  public constructor(node: any) {
    this._node = node
  }
  public is_game_item() {
    if (this._node !== null) {
      if (this._node instanceof Image) {
        return true
      }
      return false
    }
    return false
  }
}

export type { Game_Item }
export { World_Tree, Canvas_UI_Widget }
