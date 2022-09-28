class Tile
    attr_accessor :id, :name
    attr_reader :tileset, :indices, :collide

    def initialize(id, name, tileset, indices, collide = false, anim_duration = 16, anim_variance = [])
        @id = id
        @name = name
        @tileset = tileset
        @indices = indices
        @collide = collide
        @anim_duration = anim_duration
        @anim_variance = anim_variance
    end

    def to_json
        return {
            :id => @id,
            :name => @name,
            :collide => @collide,
            :animation => {
                :duration => @anim_duration,
                :variance => @anim_variance
            },
            :tileset => {
                :name => @tileset,
                :indices => @indices
            }
        }
    end
end