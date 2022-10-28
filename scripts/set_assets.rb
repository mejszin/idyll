require_relative './api.rb'

ASSETS = [
    {
        :name => nil,
        :link => "https://idyll.machin.dev",
        :license => "Unlicensed",
        :tilesets => [
            ["test_tileset", 32],
        ],
    },
    {
        :name => "Oryx Design Lab",
        :link => "https://www.oryxdesignlab.com/",
        :license => "Non-Exclusive Royalty-Free",
        :tilesets => [
            ["tiny_dungeon_interface", 16],
            ["tiny_dungeon_monsters", 16],
            ["tiny_dungeon_world", 16],
            ["tiny_galaxy_fx", 16],
            ["tiny_galaxy_interface", 16],
            ["tiny_galaxy_space", 24],
            ["tiny_galaxy_world", 16],
        ],

    },
    {
        :name => "Sharm",
        :link => "https://sharm.itch.io/tiny16",
        :license => "CC-BY-3.0 (no DRM)",
        :tilesets => [
            ["tiny_16_original", 16],
            ["tiny_16_b", 16],
            ["custom_trees", 16],
        ],
    },
    {
        :name => "Murphy's Dad",
        :link => "https://murphysdad.itch.io/",
        :license => "CC0 1.0",
        :tilesets => [
            ["computer", "16"],
        ]
    },
]

puts "Setting assets..."
set_assets(ASSETS)
puts safe_colorize("Complete.", :green)