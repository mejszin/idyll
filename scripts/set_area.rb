require_relative './api.rb'
require_relative './objects/area.rb'
require_relative './objects/groups.rb'

def test_world
    area = Area.new('test', 'Test World')
    area.links['N'] = 'test_b'
    area.ground.fill('dirt_a')
    area.ground.fill(DIRT_TILES - ['dirt_a'], 0.5)
    area.mask.fill(SHRUB_TILES, 0.2)
    area.mask.fill('stone_boulder', 0.1)
    area.mask.fill('torch', 0.2)
    area.mask.rect(nil, 3, 3, 11, 11)
    area.ground.rect('metal_floor_marker', 3, 3, 11, 11)
    area.ground.rect(METAL_FLOOR_TILES, 4, 4, 10, 10)
    area.ground.rect('metal_grate', 6, 6, 8, 8)
    set_area(area)
    get_area(area.id)
end

def test_b_world
    area = Area.new('test_b', 'Test_B World')
    area.links['S'] = 'test'
    area.ground.fill('grass_a')
    area.ground.fill(GRASS_TILES, 0.5)
    set_area(area)
    get_area(area.id)
end

puts test_world
puts test_b_world

# area.ground.fill(Tiles::Space_A)
# area.ground.random_fill(Tiles::Space_B, 0.1)
# area.ground.random_fill(Tiles::Space_C, 0.1)
# area.ground.random_fill(Tiles::Space_D, 0.1)
# 
# area.mask.random_fill(Tiles::Dwarf_Planet_A, 0.02)
# area.mask.random_fill(Tiles::Dwarf_Planet_B, 0.02)
# area.mask.random_fill(Tiles::Dwarf_Planet_C, 0.02)
# area.mask.random_fill(Tiles::Dwarf_Planet_D, 0.02)
# area.mask.random_fill(Tiles::Dwarf_Planet_E, 0.02)
# area.mask.random_fill(Tiles::Dwarf_Planet_F, 0.02)
# 
# area.mask.random_fill(Tiles::Star_A, 0.05)
# area.mask.random_fill(Tiles::Star_B, 0.05)

# area.ground.fill(Tiles::Space_A)
# area.mask.fill(Tiles::Star_A)
# area.mask.random_fill(Tiles::Star_B, 0.5)

# area.ground.fill(Tiles::Test)

#area.ground.fill(Tiles::Water)

