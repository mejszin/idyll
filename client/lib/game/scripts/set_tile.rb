require_relative './api.rb'
require_relative './objects/tile.rb'
require_relative './objects/tiles.rb'

tiles = [
    Tiles::Eye_Right,
    Tiles::Eye_Down,
    Tiles::Eye_Up,
    Tiles::Eye_Left,
]

for tile in tiles do
    set_tile(tile)
    body = get_tile(tile.id)
    puts JSON.pretty_generate(body)
end