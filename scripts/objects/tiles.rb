require_relative './tile.rb'

n, t, i, c, ad, av = :name, :tileset, :indices, :collidable, :anim_duration, :anim_variance

s = {
    :t => 'test_tileset',
    :dw => 'tiny_dungeon_world',
    :dm => 'tiny_dungeon_monsters',
    :gw => 'tiny_galaxy_world',
    :gs => 'tiny_galaxy_space',
    :gf => 'tiny_galaxy_fx',
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
]

def get_tile_by_id(id); TILES.select { |tile| tile.id == id }.first; end

get_tile_by_id('stone_boulder').destructable = {
    :durability => 2000,
    :loot => ['stone'],
}

get_tile_by_id('shrub_a').destructable = {
    :durability => 2000,
    :loot => ['biomass'],
}

get_tile_by_id('shrub_b').destructable = {
    :durability => 400,
    :loot => ['berry'],
    :becomes => 'shrub_a',
}

get_tile_by_id('torch').destructable = {
    :durability => 1200,
    :loot => ['torch'],
}