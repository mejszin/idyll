const BASE_URL = 'https://idyll.machin.dev/api';
var api_lock = false;

function getPosition(token = player_token, id = player_id, callback) {
    var url = `${BASE_URL}/game/player/position/get?token=${token}&id=${id}`;
    httpGet(url, 'json', false, function(response) {
        console.log('/game/player/position/get', response);
        callback(response);
    });
}

function setPosition(token = player_token, area, vector) {
    var url = `${BASE_URL}/game/player/position/set?token=${token}&area=${area}&x=${vector.x}&y=${vector.y}`;
    httpGet(url, 'json', false, function(response) {
        console.log('/game/player/position/set', response);
    });
}

function getArea(token = player_token, id, callback) {
    if (api_lock == false) {
        api_lock = true;
        var url = `${BASE_URL}/game/area/get?token=${token}&id=${id}`;
        httpGet(url, 'json', false, function(response) {
            console.log('/game/area/get', response);
            api_lock = false;
            callback(response);
        });
    }
}

function getPlayer(token = player_token, id = player_id, callback) {
    var url = `${BASE_URL}/game/player/get?token=${token}&id=${id}`;
    httpGet(url, 'json', false, function(response) {
        console.log('/game/player/get', response);
        callback(response);
    });
}

function getTile(token = player_token, id, callback) {
    var url = `${BASE_URL}/game/tile/get?token=${token}&id=${id}`;
    httpGet(url, 'json', true, function(response) {
        console.log('/game/tile/get', response);
        callback(response);
    }, function(error) {
        console.log('ERROR /game/tile/get', error);
        callback(-1);
    });
}