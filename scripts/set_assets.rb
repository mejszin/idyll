require_relative './api.rb'

ASSETS = [
    {
        :name => nil,
        :link => nil,
        :license => nil,
        :tilesets => [
            "test_tileset",
        ],
    },
    {
        :name => "Oryx Design Lab",
        :link => "https://www.oryxdesignlab.com/",
        :license => "Non-Exclusive Royalty-Free",
        :tilesets => [
            "tiny_dungeon_interface",
            "tiny_dungeon_monsters",
            "tiny_dungeon_world",
            "tiny_galaxy_fx",
            "tiny_galaxy_interface",
            "tiny_galaxy_space",
            "tiny_galaxy_world",
        ],

    },
    {
        :name => "Sharm",
        :link => "https://sharm.itch.io/tiny16",
        :license => "CC-BY-3.0 (no DRM)",
        :tilesets => [
            "tiny_16_original",
            "tiny_16_b",
            "custom_trees",
        ],
    }
]

puts "Setting assets..."
set_assets(ASSETS)
puts safe_colorize("Complete.", :green)