require_relative './api.rb'

get_area_players('test_planet_a').each do |user_id|
    puts get_player(user_id)
end