/**
 * @jest-environment jsdom
 */

import Player from '../src/scene/Player.ts'
import sceneAnimationConfig from '@/data/sceneAnimationConfig'
import { Canvas_UI_Widget, World_Tree } from '../src/data_structure/world_tree.ts'

describe('World Tree Functionality Test', () => {
  test('test if children can initialize properly', () => {
    const w = new World_Tree()
    const img = new Image(sceneAnimationConfig.backgroundSheetPath)
    const foo = new Canvas_UI_Widget(img)
    const p = new Player(sceneAnimationConfig.playerSheetPath)
    w.children = [ 
      foo, p
    ]
    expect(w.draw()).toBe(true);
  });

  test('test if children could fail to initialize', () => {
    const w = new World_Tree()
    const foo = new Canvas_UI_Widget("bar")
    w.children = [ 
      foo
    ]
    expect(w.draw()).toBe(false);
  });
});
