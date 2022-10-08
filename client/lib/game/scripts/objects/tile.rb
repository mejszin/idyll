class Tile
    attr_accessor :id, :name
    attr_reader :tileset, :indices, :collidable
    attr_accessor :destructable

    def initialize(id, name, tileset, indices, collidable = false, anim_duration = 16, anim_variance = [])
        @id = id
        @name = name
        @tileset = tileset
        @indices = indices
        @collidable = collidable
        @anim_duration = anim_duration
        @anim_variance = anim_variance
        @destructable = nil
    end

    def to_json
        return {
            :id => @id,
            :name => @name,
            :interaction => {
                :collidable => @collidable,
                :destructable => @destructable
            },
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