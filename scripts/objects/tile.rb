class Tile
    attr_accessor :id, :name
    attr_reader :tileset, :indices, :collidable
    attr_accessor :destructable

    def initialize(id, name: nil, tileset: nil, indices: nil, collidable: false, anim_duration: 16, anim_variance: [])
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
        hash = {
            :id => @id,
            :name => @name,
            :interaction => {
                :collidable => @collidable,
                :destructable => @destructable
            },
            :tileset => {
                :name => @tileset,
                :indices => @indices
            }
        }
        if @indices.length > 1
            hash[:animation] = {
                :duration => @anim_duration,
                :variance => @anim_variance
            }
        end
        return hash
    end
end