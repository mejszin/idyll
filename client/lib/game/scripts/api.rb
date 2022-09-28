require 'net/http'
require 'uri'
require 'json'

BASE_URL = 'https://mindful.machin.dev/api'
API_TOKEN = 'U7qTXOOX'

def post(route, headers = {}, body = nil)
    uri = URI(BASE_URL + route)
    uri.query = URI.encode_www_form(headers)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl, http.verify_mode = true, OpenSSL::SSL::VERIFY_NONE
    req = Net::HTTP::Post.new(uri.request_uri, {'Content-Type': 'application/json'})
    req.body = body.to_json unless body == nil
    res = http.request(req)
    return res.code
end

def get(route, headers = {})
    uri = URI(BASE_URL + route)
    uri.query = URI.encode_www_form(headers)
    res = Net::HTTP.get_response(uri)
    return res.code == '200' ? JSON.parse(res.body) : {}
end

def set_area(area)
    post('/game/area/set', { :token => API_TOKEN, :id => area.id }, area.to_json)
end

def get_area(area_id)
    get('/game/area/get', { :token => API_TOKEN, :id => area_id })
end

def set_tile(tile)
    post('/game/tile/set', { :token => API_TOKEN, :id => tile.id }, tile.to_json)
end

def get_tile(tile_id)
    body = get('/game/tile/get', { :token => API_TOKEN, :id => tile_id })
end

def list_tile()
    get('/game/tile/list', { :token => API_TOKEN })
end