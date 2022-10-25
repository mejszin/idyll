require_relative './api.rb'
require_relative './objects/area.rb'
require_relative './objects/groups.rb'

PLANET_ID = 'test_planet'
PLANET_NAME = 'Test Planet'
PLANET_SIZE = 3

square = alpha_square(PLANET_SIZE, PLANET_ID)

areas = square.flatten.map do |map_id|
    area = Area.new(map_id, PLANET_NAME)
    area.links = square_neighbors(square, map_id)
    area.ground.fill('dirt_a')
    area.ground.fill(DIRT_TILES - ['dirt_a'], 0.5)
    area
end

for area in areas do
    puts "Setting '#{area.id}'..."
    set_area(area)
end

puts safe_colorize("Complete.", :green)