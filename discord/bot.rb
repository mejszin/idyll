PREFIX = '~'

GAME_URL = "https://idyll.machin.dev"

DISCORD_TOKEN = File.read("./discord_token.key").chomp
DISCORD_CLIENT_ID = File.read("./discord_client_id.key").chomp

BOT_NAME = 'The Consortium'
BOT_AVATAR = './avatar.png'

require 'bundler'
Bundler.setup(:default, :ci)

require 'json'

puts "\n"
puts "DISCORD_TOKEN=#{DISCORD_TOKEN}"
puts "DISCORD_CLIENT_ID=#{DISCORD_CLIENT_ID}"
puts "\n"

require 'rest-client'
ENV["DISCORDRB_NONACL"] = "true"
require 'discordrb' # https://www.rubydoc.info/gems/discordrb/3.2.1/
require 'json'

require_relative './helpers.rb'
require_relative '../scripts/api.rb'

$bot = Discordrb::Bot.new(token: DISCORD_TOKEN, client_id: DISCORD_CLIENT_ID)

$bot.message(start_with: PREFIX + 'init') do |event|
    $bot.profile.username = BOT_NAME
    $bot.profile.avatar = File.open(BOT_AVATAR)
    event.respond format_success('Initialized bot!')
end

$bot.message(start_with: PREFIX + 'logo') do |event|
    event.send_file(File.open("./logo.png", 'r'))
    event.message.delete
end

$bot.message(start_with: PREFIX + 'help') do |event|
    message = File.readlines("./usage.txt").map { |line| line.chomp.gsub('~', PREFIX) }
    event.respond format_help(message.join("\n"))
end

$bot.message(start_with: PREFIX + 'locate') do |event|
    username = event.content.split(" ")[1]
    player = find_player(username)
    unless player == {}
        planet = player["position"][0].split("_")[0..-2].join("_").upcase
        sector = player["position"][0].split("_")[-1].upcase
        event.respond format_quote("Located **#{username}** on planet ``#{planet}`` in sector ``#{sector}``...")
    else
        event.respond format_quote("Unable to locate **#{username}**...")
    end
end

$bot.run