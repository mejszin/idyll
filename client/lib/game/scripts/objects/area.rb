require_relative './map.rb'

class Area
    attr_accessor :id, :name, :links
    attr_accessor :ground, :mask, :fringe

    def initialize(id, name)
        @id = id
        @name = name
        @links = {}
        @ground = Map.new(Tiles::Water)
        @mask = Map.new
        @fringe = Map.new
    end

    def parse_links
        tmp = {}
        @links.each { |k, v| tmp[k.is_a?(Array) ? k.join(',') : k] = v }
        return tmp
    end

    def to_json
        return {
            :id => @id,
            :name => @name,
            :links => parse_links,
            :maps => {
                :ground => @ground.to_json,
                :mask => @mask.to_json,
                :fringe => @fringe.to_json
            }
        }
    end
end

# area.links = {
#     :top => 'abc',
#     [4, 3] => 'def'
# }