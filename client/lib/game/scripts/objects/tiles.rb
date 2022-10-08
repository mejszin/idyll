require_relative './tile.rb'

module AnimationStyle
    Stable = [0.8, 1.1]
    Unstable = [0.35, 1.5]
end

# Name  = Tile.new(id, name, tileset, tile_indices, collide)

module Tiles
    # Default
    Test = Tile.new('test', 'Test', 'test_tileset', [0, 1], false)
    Water = Tile.new('water', 'Water', 'tiny_dungeon_world', [132, 133], true)
    Stone_Floor = Tile.new('stone_floor', 'Stone Floor', 'tiny_dungeon_world', [6], false)
    # Monsters
    Eye_Right = Tile.new('monster_eye_right', 'Eye', 'tiny_dungeon_monsters', [168, 168 + 16], false)
    Eye_Down = Tile.new('monster_eye_down', 'Eye', 'tiny_dungeon_monsters', [169, 169 + 16], false)
    Eye_Up = Tile.new('monster_eye_up', 'Eye', 'tiny_dungeon_monsters', [170, 170 + 16], false)
    Eye_Left = Tile.new('monster_eye_left', 'Eye', 'tiny_dungeon_monsters', [171, 171 + 16], false)
    # Metal Floor
    Metal_Floor_A = Tile.new('metal_floor_a', 'Metal Floor', 'tiny_galaxy_world', [128], false)
    Metal_Floor_B = Tile.new('metal_floor_b', 'Metal Floor', 'tiny_galaxy_world', [129], false)
    Metal_Floor_C = Tile.new('metal_floor_c', 'Metal Floor', 'tiny_galaxy_world', [130], false)
    Metal_Grate = Tile.new('metal_grate', 'Metal Grate', 'tiny_galaxy_world', [131], false)
    Metal_Floor_Marker = Tile.new('metal_floor_marker', 'Metal Floor Marker', 'tiny_galaxy_world', [148], false)
    # Shrub
    Shrub_A = Tile.new('shrub_a', 'Shrub', 'tiny_dungeon_world', [261], true)
    Shrub_B = Tile.new('shrub_b', 'Shrub', 'tiny_dungeon_world', [262], true)
    # Torch
    Torch = Tile.new('torch', 'Torch', 'tiny_dungeon_world', [197, 198], false, 12, AnimationStyle::Unstable)
    # Grass
    Grass_A = Tile.new('grass_a', 'Grass', 'tiny_dungeon_world', [88], false)
    Grass_B = Tile.new('grass_b', 'Grass', 'tiny_dungeon_world', [89], false)
    Grass_C = Tile.new('grass_c', 'Grass', 'tiny_dungeon_world', [90], false)
    Grass_D = Tile.new('grass_d', 'Grass', 'tiny_dungeon_world', [91], false)
    Grass_E = Tile.new('grass_e', 'Grass', 'tiny_dungeon_world', [92], false)
    Grass_F = Tile.new('grass_f', 'Grass', 'tiny_dungeon_world', [93], false)
    # Dirt
    Dirt_A = Tile.new('dirt_a', 'Dirt', 'tiny_dungeon_world', [72], false)
    Dirt_B = Tile.new('dirt_b', 'Dirt', 'tiny_dungeon_world', [73], false)
    Dirt_C = Tile.new('dirt_c', 'Dirt', 'tiny_dungeon_world', [74], false)
    Dirt_D = Tile.new('dirt_d', 'Dirt', 'tiny_dungeon_world', [75], false)
    Dirt_E = Tile.new('dirt_e', 'Dirt', 'tiny_dungeon_world', [76], false)
    Dirt_F = Tile.new('dirt_f', 'Dirt', 'tiny_dungeon_world', [77], false)
    # Soil
    Soil_A = Tile.new('soil_a', 'Soil', 'tiny_dungeon_world', [80], false)
    Soil_B = Tile.new('soil_b', 'Soil', 'tiny_dungeon_world', [81], false)
    Soil_C = Tile.new('soil_c', 'Soil', 'tiny_dungeon_world', [82], false)
    Soil_D = Tile.new('soil_d', 'Soil', 'tiny_dungeon_world', [83], false)
    Soil_E = Tile.new('soil_e', 'Soil', 'tiny_dungeon_world', [84], false)
    Soil_F = Tile.new('soil_f', 'Soil', 'tiny_dungeon_world', [85], false)
    # Sand
    Sand_A = Tile.new('sand_a', 'Sand', 'tiny_galaxy_world', [104], false)
    Sand_B = Tile.new('sand_b', 'Sand', 'tiny_galaxy_world', [105], false)
    Sand_C = Tile.new('sand_c', 'Sand', 'tiny_galaxy_world', [106], false)
    Sand_D = Tile.new('sand_d', 'Sand', 'tiny_galaxy_world', [107], false)
    Sand_E = Tile.new('sand_e', 'Sand', 'tiny_galaxy_world', [108], false)
    Sand_F = Tile.new('sand_f', 'Sand', 'tiny_galaxy_world', [109], false)
    Sand_G = Tile.new('sand_g', 'Sand', 'tiny_galaxy_world', [110], false)
    # Boulders
    Stone_Boulder = Tile.new('stone_boulder', 'Stone Boulder', 'tiny_dungeon_world', [206], true)
    Sandstone_Boulder = Tile.new('sandstone_boulder', 'Sandstone Boulder', 'tiny_dungeon_world', [207], true)
    # Space
    Space_A = Tile.new('space_a', 'Space', 'tiny_galaxy_world', [340], false)
    Space_B = Tile.new('space_b', 'Space', 'tiny_galaxy_world', [341], false)
    Space_C = Tile.new('space_c', 'Space', 'tiny_galaxy_world', [342], false)
    Space_D = Tile.new('space_d', 'Space', 'tiny_galaxy_world', [343], false)
    # Dwarf planet
    Dwarf_Planet_A = Tile.new('dwarf_planet_a', 'Dwarf Planet', 'tiny_galaxy_space', [0], true)
    Dwarf_Planet_B = Tile.new('dwarf_planet_b', 'Dwarf Planet', 'tiny_galaxy_space', [1], true)
    Dwarf_Planet_C = Tile.new('dwarf_planet_c', 'Dwarf Planet', 'tiny_galaxy_space', [2], true)
    Dwarf_Planet_D = Tile.new('dwarf_planet_d', 'Dwarf Planet', 'tiny_galaxy_space', [3], true)
    Dwarf_Planet_E = Tile.new('dwarf_planet_e', 'Dwarf Planet', 'tiny_galaxy_space', [4], true)
    Dwarf_Planet_F = Tile.new('dwarf_planet_f', 'Dwarf Planet', 'tiny_galaxy_space', [5], true)
    # Star
    Star_A = Tile.new('star_a', 'Star', 'tiny_galaxy_space', [6, 7], true)
    Star_B = Tile.new('star_b', 'Star', 'tiny_galaxy_space', [8, 9], true)
    # Bubble
    Bubble = Tile.new('bubble', 'Bubble', 'tiny_galaxy_fx', [112, 113], true, 16, AnimationStyle::Stable)
end

Tiles::Stone_Boulder.destructable = {
    :durability => 2000,
    :loot => ['stone'],
}