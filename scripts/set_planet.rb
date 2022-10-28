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
    area.mask.fill('torch', 0.05)
    area.mask.fill('shrub_b', 0.05)
    area.mask.fill('stone_boulder', 0.1)
    area.mask.fill('stones', 0.1)
    (0...4).each do
        i, j = area.mask.set('tree_a')
        area.fringe.set('tree_b', i, j - 1)
    end
    (0...4).each do
        i, j = area.mask.set('pillar_a')
        area.fringe.set('pillar_b', i, j - 1)
    end
    area
end

areas.sample(1).first.tap do |area|
    area.fringe.rect(nil, 3, 2, 11, 11)
    area.mask.rect(nil, 3, 3, 11, 12)
    area.ground.rect('metal_floor_marker', 3, 3, 11, 11)
    area.ground.rect(METAL_FLOOR_TILES, 4, 4, 10, 10)
    area.ground.rect('metal_grate', 6, 6, 8, 8)
    area.mask.set('computer', 5, 4)
end

areas.sample(1).first.tap do |area|
    area.ground.fill('dirt_a')
    area.ground.fill(DIRT_TILES - ['dirt_a'], 0.5)
    area.mask.fill(nil)
    area.fringe.fill(nil)
    area.mask.rect('vertical_fence', 5, 5, 12, 12)
    area.mask.rect('horizontal_fence', 6, 4, 11, 13)
    area.mask.rect(nil, 6, 5, 11, 12)
end

for area in areas do
    puts "Setting '#{area.id}'..."
    set_area(area)
end

puts safe_colorize("Complete.", :green)