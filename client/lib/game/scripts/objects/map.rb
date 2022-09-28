require_relative './tiles.rb'

MAP_WIDTH = 32
MAP_HEIGHT = 24

class Map
    def initialize(initial = nil)
        fill(initial)
    end

    def set(i, j, tile)
        @map[j][i] = tile
    end

    def fill(tile)
        @map = Array.new(MAP_HEIGHT) { Array.new(MAP_WIDTH) { tile } }
    end

    def random_fill(tile, percentage)
        @map.each_with_index do |row, j|
            row.each_with_index do |t, i|
                @map[j][i] = tile if rand < percentage
            end
        end
    end

    def to_json
        return @map.map { |row| row.map { |tile| { :id => (tile == nil ? nil : tile.id) } } }
    end
end