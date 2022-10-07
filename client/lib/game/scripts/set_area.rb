require_relative './api.rb'
require_relative './objects/area.rb'

def build_test_world
    area = Area.new('test', 'Test World')
    area.links['N'] = 'test_b'
    area.ground.fill(Tiles::Dirt_A)
    area.ground.random_fill(Tiles::Dirt_B, 0.1)
    area.ground.random_fill(Tiles::Dirt_C, 0.1)
    area.ground.random_fill(Tiles::Dirt_D, 0.1)
    area.ground.random_fill(Tiles::Dirt_E, 0.1)
    area.ground.random_fill(Tiles::Dirt_F, 0.1)
    area.mask.random_fill(Tiles::Torch, 0.2)
    area.mask.random_fill(Tiles::Torch, 0.2)
    area.mask.random_fill(Tiles::Shrub_A, 0.1)
    area.mask.random_fill(Tiles::Shrub_B, 0.1)
    set_area(area)
    return get_area(area.id)
end

def test_b_world
    area = Area.new('test_b', 'Test_B World')
    area.links['S'] = 'test'
    area.ground.fill(Tiles::Grass_A)
    area.ground.random_fill(Tiles::Grass_B, 0.1)
    area.ground.random_fill(Tiles::Grass_C, 0.1)
    area.ground.random_fill(Tiles::Grass_D, 0.1)
    area.ground.random_fill(Tiles::Grass_E, 0.1)
    area.ground.random_fill(Tiles::Grass_F, 0.1)
    set_area(area)
    get_area(area.id)
end

puts test_world
#puts test_b_world

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

