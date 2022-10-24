require_relative './api.rb'
require_relative './objects/tile.rb'
require_relative './objects/tiles.rb'

for tile in TILES do
    body = get_tile(tile.id)
    puts body
end

puts safe_colorize("Complete.", :green)