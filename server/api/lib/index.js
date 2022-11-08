const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.locals.jsonParser = bodyParser.json()
app.locals.urlencodedParser = bodyParser.urlencoded({ extended: true })

const PORT = 86;

const VERSION = 'v0.0.1';

const fs = require('fs');
const user_data_path = './data/users.json';
var user_data = fs.existsSync(user_data_path) ? JSON.parse(fs.readFileSync(user_data_path)) : {};
const game_data_path = './data/game.json';
var game_data = fs.existsSync(game_data_path) ? JSON.parse(fs.readFileSync(game_data_path)) : {};
const asset_data_path = './data/assets.json';
var asset_data = fs.existsSync(asset_data_path) ? JSON.parse(fs.readFileSync(asset_data_path)) : {};
const chat_data_path = './data/chat.json';
var chat_data = fs.existsSync(chat_data_path) ? JSON.parse(fs.readFileSync(chat_data_path)) : {};

const bcrypt = require('bcrypt');

const methods = {};

methods.randomString = (length = 8) => {
    var char_set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var id = '';
    for (var i = 0; i < length; i++) {
        id += char_set.charAt(
            Math.floor(Math.random() * char_set.length)
        );
    }
    return id;
}

methods.writeUsers = () => {
    fs.writeFileSync(user_data_path, JSON.stringify(user_data));
}

methods.writeGame = () => {
    fs.writeFileSync(game_data_path, JSON.stringify(game_data));
}

methods.writeAssets = () => {
    fs.writeFileSync(asset_data_path, JSON.stringify(asset_data));
}

methods.writeChat = () => {
    fs.writeFileSync(chat_data_path, JSON.stringify(chat_data));
}

methods.isToken = (token) => {
    return (token in user_data);
}

methods.isUser = (user_id) => {
    // TODO:
    return true;
}

methods.newSaltHash = (password) => {
    return new Promise((resolve) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, function(err, hash) {
                resolve([salt, hash]);
            });
        })
    });
};

methods.getChat = (time_filter = null) => {
    if (time_filter == null) {
        return chat_data;
    } else {
        let result = [];
        let index = chat_data.length - 1;
        while ((index > -1) && (chat_data[index].time > time_filter)) {
            result.push(chat_data[index]);
            index -= 1;
        }
        return result;
    }
};

methods.newChat = (token, message) => {
    if (methods.isToken(token)) {
        let user_id = user_data[token].id;
        let username = user_data[token].username;
        let area_id = game_data.players[user_id].position[0];
        let locale_name = game_data.areas[area_id].metadata.locale.name;
        let chat = {
            time: Date.now(),
            message: message,
            author: {
                id: user_id,
                username: username,
                locale: locale_name
            }
        }
        console.log(chat);
        chat_data.push(chat);
        return true;
    } else {
        return false;
    }
};

methods.getAssets = () => {
    return asset_data;
};

methods.setAssets = (token, assets) => {
    if (methods.isToken(token)) {
        asset_data = assets;
        return true;
    } else {
        return false;
    }
};

methods.createUser = async (username, password) => {
    if (methods.usernameExists(username)) { return undefined };
    var token = methods.randomString();
    var user_id = methods.randomString();
    var salt_hash = await methods.newSaltHash(password);
    user_data[token] = {
        id: user_id,
        alias: username,
        username: username,
        password: {
            salt: salt_hash[0],
            hash: salt_hash[1]
        }
    };
    console.log(user_data[token]);
    game_data.players[user_id] = {
        username: username,
        position: [null, 0, 0], // [area, x, y]
    }
    return token;
}

methods.getUser = (token, user_id = null) => {
    if (token in user_data) {
        if (user_id == null) {
            return user_data[token];
        } else {
            // TODO: Search for user_id
            return undefined;
        }
    } else {
        return undefined;
    }
}

methods.usernameExists = (username) => {
    var exists = false;
    Object.keys(user_data).forEach(function(token) {
        if (username == user_data[token].username) {
            exists = true;
        };
    })
    return exists;
};

methods.findCredentials = async (username, password) => {
    if (!methods.usernameExists(username)) { return null };
    return new Promise((resolve, reject) => {
        Object.keys(user_data).forEach(async function(token) {
            if (username == user_data[token].username) {
                const result = await bcrypt.compare(password, user_data[token].password.hash);
                resolve(result ? token : null);
            }
        });
    });
};

methods.getUserIdByUsername = (username) => {
    var id = null;
    Object.keys(game_data.players).forEach(function(user_id) {
        if (username == game_data.players[user_id].username) {
            id = user_id;
        };
    });
    return id;
}

methods.getGamePlayer = (user_id) => {
    if (user_id in game_data.players) {
        return game_data.players[user_id];
    } else {
        return undefined;
    }
}

methods.setGamePlayerPosition = (user_id, area, x, y) => {
    if (user_id in game_data.players) {
        game_data.players[user_id].position = [area, x, y];
        return true;
    } else {
        return false;
    }
}

methods.setGameArea = (area_id, data) => {
    game_data.areas[area_id] = data;
    return true;
}

methods.getGameArea = (area_id) => {
    if (area_id in game_data.areas) {
        return game_data.areas[area_id];
    } else {
        return undefined;
    }
}

methods.getGameAreaPlayers = (area_id) => {
    let players = [];
    Object.keys(game_data.players).forEach(function(user_id) {
        if (game_data.players[user_id].position[0] == area_id) {
            players.push(user_id);
        };
    });
    return players;
}
methods.setGameTile = (tile_id, data) => {
    game_data.tiles[tile_id] = data;
    return true;
}

methods.getGameTile = (tile_id) => {
    if (tile_id in game_data.tiles) {
        return game_data.tiles[tile_id];
    } else {
        return undefined;
    }
}

methods.listGameTile = () => {
    return Object.keys(game_data.tiles);
}

app.get('/ping', (req, res) => {
    console.log('/ping', req.query);
    res.status(200).send('Pong!');
});

app.get('/user/get', (req, res) => {
    console.log('/user/get', req.query);
    const { token } = req.query;
    if (methods.isToken(token)) {
        // Success
        res.status(200).send(methods.getUser(token));
    } else {
        // Unauthorized
        res.status(401).send();
    }
});

app.get('/user/login', async (req, res) => {
    console.log('/user/login', req.query);
    const { username, password } = req.query;
    if (methods.usernameExists(username)) {
        var token = await methods.findCredentials(username, password);
        if (token != null) {
            console.log('Found credentials!', 'token=', token);
        } else {
            console.log('Incorrect password...');
        }
    } else {
        var token = null;
        console.log('Could not find credentials...');
    }
    if (token != null) {
        // Success
        var user = methods.getUser(token);
        res.status(200).send({ id: user.id, token: token });
    } else {
        // Unauthorized
        res.status(401).send();
    }
});

app.get('/user/new', async (req, res) => {
    console.log('/user/new', req.query);
    const { username, password } = req.query;
    if ((username != undefined) && (password != undefined)) {
        var token = await methods.createUser(username, password);
        if (token != undefined) {
            // Success
            methods.writeUsers();
            methods.writeGame();
            res.status(200).send({ token: token });
        } else {
            res.status(204).send();
        }
    } else {
        // Bad request
        res.status(400).send();
    }
});

app.post('/game/assets/set', (req, res) => {
    console.log('/game/assets/set', req.query);
    const { token } = req.query;
    const data = req.body;
    if (methods.isToken(token)) {
        // Success
        methods.setAssets(token, data);
        methods.writeAssets();
        res.status(200).send();
    } else {
        // Unauthorized
        res.status(401).send();
    }
});

app.get('/game/assets/get', (req, res) => {
    console.log('/game/assets/get', req.query);
    // Success
    let assets = methods.getAssets();
    res.status(200).send(assets);
});

app.post('/game/tile/set', (req, res) => {
    console.log('/game/tile/set', req.query);
    const { token, id } = req.query;
    const data = req.body;
    if (methods.isToken(token)) {
        // Success
        methods.setGameTile(id, data);
        methods.writeGame();
        res.status(200).send();
    } else {
        // Unauthorized
        res.status(401).send();
    }
});

app.get('/game/tile/get', (req, res) => {
    console.log('/game/tile/get', req.query);
    const { token, id } = req.query;
    if (methods.isToken(token)) {
        // Success
        let tile = methods.getGameTile(id);
        if (tile !== undefined) {
            res.status(200).send(tile);
        } else {
            res.status(204).send();
        }
    } else {
        // Unauthorized
        res.status(401).send();
    }
});

app.get('/game/chat/new', (req, res) => {
    console.log('/game/chat/new', req.query);
    const { token, message } = req.query;
    if (methods.isToken(token)) {
        methods.newChat(token, message);
        methods.writeChat();
        res.status(200).send(true);
    } else {
        // Unauthorized
        res.status(401).send();
    }
});

app.get('/game/chat/get', (req, res) => {
    console.log('/game/chat/get', req.query);
    const { token, filter } = req.query;
    if (methods.isToken(token)) {
        // Success
        let chat = methods.getChat(filter);
        res.status(200).send(chat);
    } else {
        // Unauthorized
        res.status(401).send();
    }
});

app.get('/game/tile/list', (req, res) => {
    console.log('/game/tile/list', req.query);
    const { token } = req.query;
    if (methods.isToken(token)) {
        // Success
        res.status(200).send(methods.listGameTile());
    } else {
        // Unauthorized
        res.status(401).send();
    }
});

app.post('/game/area/set', (req, res) => {
    console.log('/game/area/set', req.query);
    const { token, id } = req.query;
    const data = req.body;
    if (methods.isToken(token)) {
        // Success
        methods.setGameArea(id, data);
        methods.writeGame();
        res.status(200).send({});
    } else {
        // Unauthorized
        res.status(401).send();
    }
});

app.get('/game/area/get', (req, res) => {
    console.log('/game/area/get', req.query);
    const { token, id } = req.query;
    if (methods.isToken(token)) {
        // Success
        let area = methods.getGameArea(id);
        if (area !== undefined) {
            res.status(200).send(area);
        } else {
            res.status(204).send();
        }
    } else {
        // Unauthorized
        res.status(401).send();
    }
});

app.get('/game/area/players/get', (req, res) => {
    console.log('/game/area/players/get', req.query);
    const { token, id } = req.query;
    if (methods.isToken(token)) {
        // Success
        let players = methods.getGameAreaPlayers(id);
        res.status(200).send(players);
    } else {
        // Unauthorized
        res.status(401).send();
    }
});


app.get('/game/player/get', (req, res) => {
    console.log('/game/player/get', req.query);
    const { token, id } = req.query;
    if (methods.isToken(token)) {
        // Success
        let player = methods.getGamePlayer(id);
        if (player !== undefined) {
            res.status(200).send(player);
        } else {
            res.status(204).send();
        }
    } else {
        // Unauthorized
        res.status(401).send();
    }
});

app.get('/game/player/find', (req, res) => {
    console.log('/game/player/find', req.query);
    const { token, username } = req.query;
    if (methods.isToken(token)) {
        let player_id = methods.getUserIdByUsername(username);
        if (player_id != null) {
            let player = methods.getGamePlayer(player_id);
            if (player != null) {
                // Success
                res.status(200).send(player);
            } else {
                res.status(204).send();
            }
        } else {
            res.status(204).send();
        }
    } else {
        // Unauthorized
        res.status(401).send();
    }
});

app.get('/game/player/position/get', (req, res) => {
    console.log('/game/player/position/get', req.query);
    const { token, id } = req.query;
    if (methods.isToken(token)) {
        // Success
        let player = methods.getGamePlayer(id);
        if (player !== undefined) {
            res.status(200).send(player.position);
        } else {
            res.status(204).send();
        }
    } else {
        // Unauthorized
        res.status(401).send();
    }
});

app.get('/game/player/position/set', (req, res) => {
    console.log('/game/player/position/set', req.query);
    const { token, area, x, y } = req.query;
    if (methods.isToken(token)) {
        methods.setGamePlayerPosition(methods.getUser(token).id, area, x, y);
        methods.writeGame();
        res.status(200).send(true);
    } else {
        // Unauthorized
        res.status(401).send();
    }
});

app.listen(PORT, () => console.log(`It's alive on port ${PORT}!`));