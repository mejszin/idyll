require_relative './api.rb'
require_relative './objects/tile.rb'
require_relative './objects/tiles.rb'

tiles = [
    Tiles::Eye_Right,
    Tiles::Eye_Down,
    Tiles::Eye_Up,
    Tiles::Eye_Left,
    Tiles::Test,
    Tiles::Water,
    Tiles::Stone_Floor,
    Tiles::Metal_Floor_A,
    Tiles::Metal_Floor_B,
    Tiles::Metal_Floor_C,
    Tiles::Metal_Grate,
    Tiles::Metal_Floor_Marker,
    Tiles::Shrub_A,
    Tiles::Shrub_B,
    Tiles::Torch,
    Tiles::Grass_A,
    Tiles::Grass_B,
    Tiles::Grass_C,
    Tiles::Grass_D,
    Tiles::Grass_E,
    Tiles::Grass_F,
    Tiles::Dirt_A,
    Tiles::Dirt_B,
    Tiles::Dirt_C,
    Tiles::Dirt_D,
    Tiles::Dirt_E,
    Tiles::Dirt_F,
    Tiles::Soil_A,
    Tiles::Soil_B,
    Tiles::Soil_C,
    Tiles::Soil_D,
    Tiles::Soil_E,
    Tiles::Soil_F,
    Tiles::Sand_A,
    Tiles::Sand_B,
    Tiles::Sand_C,
    Tiles::Sand_D,
    Tiles::Sand_E,
    Tiles::Sand_F,
    Tiles::Sand_G,
    Tiles::Stone_Boulder,
    Tiles::Sandstone_Boulder,
    Tiles::Space_A,
    Tiles::Space_B,
    Tiles::Space_C,
    Tiles::Space_D,
    Tiles::Dwarf_Planet_A,
    Tiles::Dwarf_Planet_B,
    Tiles::Dwarf_Planet_C,
    Tiles::Dwarf_Planet_D,
    Tiles::Dwarf_Planet_E,
    Tiles::Dwarf_Planet_F,
    Tiles::Star_A,
    Tiles::Star_B,
    Tiles::Bubble,
]

for tile in tiles do
    puts "Setting '#{tile.id}'..."
    set_tile(tile)
    # body = get_tile(tile.id)
    # puts JSON.pretty_generate(body)
end

puts "Complete."