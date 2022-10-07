require_relative './api.rb'
require_relative './objects/tile.rb'
require_relative './objects/tiles.rb'

tiles = [
    Tiles::Shrub_A,
    Tiles::Shrub_B,
]

for tile in tiles do
    set_tile(tile)
    body = get_tile(tile.id)
    puts JSON.pretty_generate(body)
end