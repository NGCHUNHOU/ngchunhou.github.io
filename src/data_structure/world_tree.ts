import Player from '../scene/Player'

interface Game_Item {
  // this function should apply the item into the game canvas
  apply_into_game(): boolean
}

class World_Tree {
  public id: string = globalThis.crypto.randomUUID();
  public name: string = "";
  public parentId: string = "";
  private game_item_index_map: Map<string, number> = new Map()
  private children: Game_Item[] = [];
  public apply_all_game_items_into_game(): boolean {
    for (const item of this.children) {
      if (!item.apply_into_game()) {
        return false
      }
    }
    return true
  }
  public add_child(game_item_name: string, game_item: Game_Item): boolean {
    const current_item_index = this.children.push(game_item) - 1
    this.game_item_index_map.set(game_item_name, current_item_index)
    return true
  }
  public get_child(game_item_name: string): Game_Item {
    return this.children[this.game_item_index_map.get(game_item_name) as number]
  }
}

class Canvas_UI_Widget implements Game_Item {
  private _node: any = null
  public constructor(node: any) {
    this._node = node
  }
  public apply_into_game() {
    if (!(this._node instanceof Image)) {
      return false
    }
    return true
  }
  public get_node_image() {
    return this._node
  }
}

export type { Game_Item }
export { World_Tree, Canvas_UI_Widget }
