require_relative './api.rb'
require_relative './objects/tile.rb'
require_relative './objects/tiles.rb'

for tile in TILES do
    puts "Setting '#{tile.id}'..."
    set_tile(tile)
#   body = get_tile(tile.id)
#   puts JSON.pretty_generate(body)
end

puts safe_colorize("Complete.", :green)