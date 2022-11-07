require_relative './map.rb'

class Area
    attr_accessor :id, :name, :links, :metadata
    attr_accessor :ground, :mask, :fringe

    def initialize(id, name)
        @id = id
        @name = name
        @links = {}
        @metadata = {}
        @ground = Map.new('ground', 'water')
        @mask = Map.new('mask')
        @fringe = Map.new('fringe')
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
            :metadata => @metadata,
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