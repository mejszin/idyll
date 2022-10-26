require_relative './tile.rb'

n, t, i, c, ad, av = :name, :tileset, :indices, :collidable, :anim_duration, :anim_variance

s = {
    :t  => 'test_tileset',
    :dw => 'tiny_dungeon_world',
    :dm => 'tiny_dungeon_monsters',
    :gw => 'tiny_galaxy_world',
    :gs => 'tiny_galaxy_space',
    :gf => 'tiny_galaxy_fx',
    :tb => 'tiny_16_b',
    :to => 'tiny_16_original',
    :ct => 'custom_trees',
}

TILES = [
    Tile.new('test'              , { n => 'Test'              , t => s[:t] , i => [0, 1] }),
    Tile.new('water'             , { n => 'Water'             , t => s[:dw], i => [132, 133], c => true }),
    Tile.new('stone_floor'       , { n => 'Stone Floor'       , t => s[:dw], i => [6] }),
    Tile.new('monster_eye_right' , { n => 'Eye'               , t => s[:dm], i => [168, 168 + 16] }),
    Tile.new('monster_eye_down'  , { n => 'Eye'               , t => s[:dm], i => [169, 169 + 16] }),
    Tile.new('monster_eye_up'    , { n => 'Eye'               , t => s[:dm], i => [170, 170 + 16] }),
    Tile.new('monster_eye_left'  , { n => 'Eye'               , t => s[:dm], i => [171, 171 + 16] }),
    Tile.new('metal_floor_a'     , { n => 'Metal Floor'       , t => s[:gw], i => [128] }),
    Tile.new('metal_floor_b'     , { n => 'Metal Floor'       , t => s[:gw], i => [129] }),
    Tile.new('metal_floor_c'     , { n => 'Metal Floor'       , t => s[:gw], i => [130] }),
    Tile.new('metal_grate'       , { n => 'Metal Grate'       , t => s[:gw], i => [131] }),
    Tile.new('metal_floor_marker', { n => 'Metal Floor Marker', t => s[:gw], i => [148] }),
    Tile.new('shrub_a'           , { n => 'Shrub'             , t => s[:dw], i => [261], c => true }),
    Tile.new('shrub_b'           , { n => 'Shrub'             , t => s[:dw], i => [262], c => true }),
    Tile.new('torch'             , { n => 'Torch'             , t => s[:dw], i => [197, 198], ad => 12, av => [0.35, 1.5] }),
    Tile.new('grass_a'           , { n => 'Grass'             , t => s[:dw], i => [88] }),
    Tile.new('grass_b'           , { n => 'Grass'             , t => s[:dw], i => [89] }),
    Tile.new('grass_c'           , { n => 'Grass'             , t => s[:dw], i => [90] }),
    Tile.new('grass_d'           , { n => 'Grass'             , t => s[:dw], i => [91] }),
    Tile.new('grass_e'           , { n => 'Grass'             , t => s[:dw], i => [92] }),
    Tile.new('grass_f'           , { n => 'Grass'             , t => s[:dw], i => [93] }),
    Tile.new('dirt_a'            , { n => 'Dirt'              , t => s[:dw], i => [72] }),
    Tile.new('dirt_b'            , { n => 'Dirt'              , t => s[:dw], i => [73] }),
    Tile.new('dirt_c'            , { n => 'Dirt'              , t => s[:dw], i => [74] }),
    Tile.new('dirt_d'            , { n => 'Dirt'              , t => s[:dw], i => [75] }),
    Tile.new('dirt_e'            , { n => 'Dirt'              , t => s[:dw], i => [76] }),
    Tile.new('dirt_f'            , { n => 'Dirt'              , t => s[:dw], i => [77] }),
    Tile.new('soil_a'            , { n => 'Soil'              , t => s[:dw], i => [80] }),
    Tile.new('soil_b'            , { n => 'Soil'              , t => s[:dw], i => [81] }),
    Tile.new('soil_c'            , { n => 'Soil'              , t => s[:dw], i => [82] }),
    Tile.new('soil_d'            , { n => 'Soil'              , t => s[:dw], i => [83] }),
    Tile.new('soil_e'            , { n => 'Soil'              , t => s[:dw], i => [84] }),
    Tile.new('soil_f'            , { n => 'Soil'              , t => s[:dw], i => [85] }),
    Tile.new('sand_a'            , { n => 'Sand'              , t => s[:gw], i => [104] }),
    Tile.new('sand_b'            , { n => 'Sand'              , t => s[:gw], i => [105] }),
    Tile.new('sand_c'            , { n => 'Sand'              , t => s[:gw], i => [106] }),
    Tile.new('sand_d'            , { n => 'Sand'              , t => s[:gw], i => [107] }),
    Tile.new('sand_e'            , { n => 'Sand'              , t => s[:gw], i => [108] }),
    Tile.new('sand_f'            , { n => 'Sand'              , t => s[:gw], i => [109] }),
    Tile.new('sand_g'            , { n => 'Sand'              , t => s[:gw], i => [110] }),
    Tile.new('stone_boulder'     , { n => 'Stone Boulder'     , t => s[:dw], i => [206], c => true }),
    Tile.new('sandstone_boulder' , { n => 'Sandstone Boulder' , t => s[:dw], i => [207], c => true }),
    Tile.new('space_a'           , { n => 'Space'             , t => s[:gw], i => [340] }),
    Tile.new('space_b'           , { n => 'Space'             , t => s[:gw], i => [341] }),
    Tile.new('space_c'           , { n => 'Space'             , t => s[:gw], i => [342] }),
    Tile.new('space_d'           , { n => 'Space'             , t => s[:gw], i => [343] }),
    Tile.new('dwarf_planet_a'    , { n => 'Dwarf Planet'      , t => s[:gs], i => [0], c => true }),
    Tile.new('dwarf_planet_b'    , { n => 'Dwarf Planet'      , t => s[:gs], i => [1], c => true }),
    Tile.new('dwarf_planet_c'    , { n => 'Dwarf Planet'      , t => s[:gs], i => [2], c => true }),
    Tile.new('dwarf_planet_d'    , { n => 'Dwarf Planet'      , t => s[:gs], i => [3], c => true }),
    Tile.new('dwarf_planet_e'    , { n => 'Dwarf Planet'      , t => s[:gs], i => [4], c => true }),
    Tile.new('dwarf_planet_f'    , { n => 'Dwarf Planet'      , t => s[:gs], i => [5], c => true }),
    Tile.new('star_a'            , { n => 'Star'              , t => s[:gs], i => [6, 7], c => true }),
    Tile.new('star_b'            , { n => 'Star'              , t => s[:gs], i => [8, 9], c => true }),
    Tile.new('bubble'            , { n => 'Bubble'            , t => s[:gf], i => [112, 113], c => true, ad => 16, av => [0.8, 1.1] }),
    Tile.new('stones'            , { n => 'Stones'            , t => s[:tb], i => [17], c => true }),
    Tile.new('tree_a'            , { n => 'Tree'              , t => s[:ct], i => [2], c => true }),
    Tile.new('tree_b'            , { n => 'Tree'              , t => s[:ct], i => [0], c => false }),
    Tile.new('horizontal_fence'  , { n => 'Fence'             , t => s[:to], i => [51], c => true }),
    Tile.new('vertical_fence'    , { n => 'Fence'             , t => s[:to], i => [59], c => true }),
    Tile.new('pillar_a'          , { n => 'Pillar'            , t => s[:to], i => [99], c => true }),
    Tile.new('pillar_b'          , { n => 'Pillar'            , t => s[:to], i => [91], c => false }),
]

def get_tile_by_id(id); TILES.select { |tile| tile.id == id }.first; end

get_tile_by_id('stone_boulder').destructable = {
    :durability => 2000,
    :loot => [['stone', [3, 4, 5]]],
}

get_tile_by_id('stones').destructable = {
    :durability => 1200,
    :loot => [['stone', [1, 2, 3]]],
}

get_tile_by_id('shrub_a').destructable = {
    :durability => 2000,
    :loot => [['biomass', [1, 2, 3]]],
}

get_tile_by_id('shrub_b').destructable = {
    :durability => 400,
    :loot => [['berry', [1, 2, 3]]],
    :becomes => 'shrub_a',
}

get_tile_by_id('torch').destructable = {
    :durability => 1200,
    :loot => [['torch', [1]]],
}

get_tile_by_id('tree_a').destructable = {
    :durability => 1200,
    :loot => [['wood', [3, 4, 5]], ['biomass', [1, 2, 3]]],
    :connected => {
        :fringe => [[0, -1]]
    }
}

get_tile_by_id('pillar_a').destructable = {
    :durability => 3600,
    :loot => [['stone', [3, 4, 5]]],
    :connected => {
        :fringe => [[0, -1]]
    }
}