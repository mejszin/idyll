require_relative './tiles.rb'

MAP_WIDTH = 20 # 32
MAP_HEIGHT = 16 # 24

class Map
    def initialize(initial = nil)
        fill(initial)
    end

    def set(i, j, tile)
        @map[j][i] = tile
    end

    def choose(arr)
        return arr unless arr.is_a?(Array)
        return arr.sample(1).first
    end

    def rect(tile, x1, y1, x2, y2, percentage = 1)
        (y1..y2).each do |j|
            (x1..x2).each do |i|
                @map[j][i] = choose(tile) if rand < percentage
            end
        end
    end

    def fill(tile, percentage = 1)
        if percentage == 1
            @map = Array.new(MAP_HEIGHT) { Array.new(MAP_WIDTH) { choose(tile) } }
        else
            random_fill(tile, percentage)
        end
    end

    def random_fill(tile, percentage)
        @map.each_with_index do |row, j|
            row.each_with_index do |t, i|
                @map[j][i] = choose(tile) if rand < percentage
            end
        end
    end

    def to_json
        @map.map do |row| 
            row.map do |tile|
                { :id => (tile == nil ? nil : tile.id) }
            end
        end
    end
end