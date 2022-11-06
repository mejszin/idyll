PREFIX = '.'

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

require_relative './helpers.rb'

$bot = Discordrb::Bot.new(token: DISCORD_TOKEN, client_id: DISCORD_CLIENT_ID)

$bot.message(start_with: PREFIX + 'init') do |event|
    $bot.profile.username = BOT_NAME
    $bot.profile.avatar = File.open(BOT_AVATAR)
    event.respond format_success('Initialized bot!')
end

$bot.message(start_with: PREFIX + 'idyll') do |event|
    event.respond format_success("Bot active!")
end

$bot.run