var logger = require('winston');
var auth = require('./auth.json');
const GoogleImages = require('google-images');
var http = require('http');
var giphy = require('giphy-api')(auth.giphy);


const Discord = require("discord.js");
const client = new Discord.Client();
client.login(auth.discord);


const imgClient = new GoogleImages('014542467886679922052:guxkga1igcq', auth.google);

var guesses = {};
var toGuess = null;
var gameWinners = [];


client.on('message', function (msg) {
    if (!msg.author.bot)
        if (msg.content.substring(0, 1) == '!') {
            var args = msg.content.substring(1).split(' ');
            var cmd = args[0];
            switch (cmd) {
                case 'help':
                    msg.reply('Type !guess and a number between 0 and 10 to play the guessing game.');
                    break;
                case 'guess':
                    onGuess(msg, args);
                    break;
                case 'results':
                    onResults(msg);
                    break;
                case 'winners':
                    onWinners(msg);
                    break;
                case 'img':
                    img(msg, args);
                    break;
                case 'gif':
                    gif(msg, args);
                    break;
                case 'meaningoflife':
                    meaningOfLife(msg);
                    break;
                default:
                    break;
            }
        }
});

function onGuess(msg, args) {
    if (toGuess == null) {
        toGuess = Math.floor(Math.random() * 10) + 1;
    }
    if (args[1] == null) {
        msg.reply('Please enter a number to play');
    } else {
        guesses[msg.author.username] = args[1];
        if (!isNumber(args[1])) {
            msg.reply(msg.author.username + ' Enter a number you asshole');
            return;
        }
        if (args[1] > 10 || args[1] < 0) {
            msg.reply(msg.author.username + ' Between 0 and 10 you cunt');
            return;
        }
        msg.reply(msg.author.username + '  has entered ' + args[1]);
    }
}

function onResults(msg) {
    var winners = [];
    for (key in guesses) {
        if (parseInt(guesses[key]) == parseInt(toGuess)) {
            winners.push(key);
        }
    }
    if (winners.length == 0) {
        var winnerNumber;
        if (toGuess == null) {
            winnerNumber = 'not set';
        } else {
            winnerNumber = toGuess;
        }
        msg.reply('No one won. You are all idiots.. The number was ' + winnerNumber);
        toGuess = null;
    } else {
        var winnersMessage = "The winners are: ";
        for (key in winners) {
            winnersMessage += winners[key] + ", ";
            if (gameWinners[winners[key]] == undefined) {
                gameWinners[winners[key]] = 1;
            } else {
                gameWinners[winners[key]] = gameWinners[winners[key]] + 1;
            }
        }
        winnersMessage += "Yay!";
        msg.reply(winnersMessage);
        toGuess = null;
    }
}

function onWinners(msg) {
    var winnerMessage = "The winners are: ";
    for (guy in gameWinners) {
        winnerMessage += guy + " " + gameWinners[guy] + " times,"
    }
    msg.reply(winnerMessage);
}

function img(msg, args) {
    if (args[1] == null) {
        msg.reply('Search for an image by entering keywords after !img');
    } else {
        var imgSearchTerm = '';
        for (var i = 1; i < args.length; i++) {
            imgSearchTerm += args[i];
        }
        imgSearch(imgSearchTerm, msg);
    }
}

function gif(msg, args) {
    if (args[1] == null) {
        msg.reply('Search for an gif by entering keywords after !gif');
    } else {
        var gifSearchParameter = "";
        for (var y = 1; y < args.length; y++) {
            gifSearchParameter += args[y];
        }
        gifSearch(gifSearchParameter, msg);
    }
}

function meaningOfLife(msg){
    var meaning;
    switch (Math.floor(Math.random() * 2) + 1) {
        case 1:
            meaning = 'BIER!';
            break;
        case 2:
            meaning = '42';
            break;
    }
    msg.reply(meaning);
}


function isNumber(obj) {
    return !isNaN(parseInt(obj))
}

function imgSearch(searchParam, msg) {
    imgClient.search(searchParam).then(function (images) {
        if (images[0] == undefined) {
            msg.reply('img not found :c');
        } else {
            msg.reply(images[0].url);
        }
    });
}

function apiRequest(url, path, searchParam) {
    var options = {
        host: url,
        port: 80,
        path: path,
        method: 'GET'
    };

    http.request(options, function (res) {
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    }).end();
}

function gifSearch(searchParam, msg) {
    giphy.search({
        q: searchParam,
        limit: 1
    }, function (err, res) {
        if (res.data[0] == undefined) {
            msg.reply('gif not found :c');
        } else {
            msg.reply(res.data[0].url);
        }
    });
}