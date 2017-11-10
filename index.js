var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
const GoogleImages = require('google-images');
var http = require('http');
var giphy = require('giphy-api')('unHuWkw8KAp7nEAv6JFaBB9queJlWdii');

const client = new GoogleImages('014542467886679922052:guxkga1igcq', 'AIzaSyAzMsr_yoPZYx8ggmpJ_QPeu-4pPETqGCk');
var guesses = {};
var toGuess = null;
var gameWinners = [];

var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        switch (cmd) {
            case 'sanic':
            case 'SANIC':
                var sanic;
                switch (Math.floor(Math.random() * 7) + 1){
                    case 1:
                        sanic =  'SAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANIC';
                        break;
                    case 2:
                        sanic =  'sonic?';
                        break;
                    case 3:
                        sanic =  'SnAniC';
                        break;
                    case 4:
                        sanic =  'soanic';
                        break;
                    case 5:
                        sanic =  'Soooooooooooooooouuunic.';
                        break;
                    case 6:
                        sanic =  'mnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnmarcel!.';
                        break;
                    case 7:
                        sanic =  '!SANIC';
                        break;
                }
                bot.sendMessage({
                    to: channelID,
                    message: sanic,
                    tts: true
                });
                break;
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: 'Type !guess and a number between 0 and 10 to play the guessing game.'
                });
                break;
            case 'guess':
                if (toGuess == null) {
                    toGuess = Math.floor(Math.random() * 10) + 1;
                }
                if (args[1] == null) {
                    bot.sendMessage({
                        to: channelID,
                        message: 'Please enter a number to play',
                        tts: true
                    });
                } else {
                    guesses[user] = args[1];
                    if (!isNumber(args[1])) {
                        bot.sendMessage({
                            to: channelID,
                            message: user + ' Enter a number you asshole',
                            tts: true
                        });
                        break;
                    }
                    if (args[1] > 10 || args[1] < 0) {
                        bot.sendMessage({
                            to: channelID,
                            message: user + ' Between 0 and 10 you cunt',
                            tts: true
                        });
                        break;
                    }
                    bot.sendMessage({
                        to: channelID,
                        message: user + '  has entered ' + args[1],
                        tts: true
                    });
                }
                break;
            case 'results':
                var winners = [];
                for (key in guesses) {
                    if (parseInt(guesses[key]) == parseInt(toGuess)) {
                        winners.push(key);
                    }
                }
                if (winners.length == 0) {
                    var winnerNumber;
                    if(toGuess == null){
                        winnerNumber = 'not set';
                    } else {
                        winnerNumber = toGuess;
                    }
                    bot.sendMessage({
                        to: channelID,
                        message: 'No one won. You are all idiots.. The number was ' + winnerNumber,
                        tts: true
                    });
                    toGuess = null;
                } else {
                    var winnerMessage = "The winners are: ";
                    for (key in winners) {
                        winnerMessage += winners[key] + ", ";
                        if (gameWinners[winners[key]] == undefined) {
                            gameWinners[winners[key]] = 1;
                        } else {
                            gameWinners[winners[key]] = gameWinners[winners[key]] + 1;
                        }
                    }
                    winnerMessage += "Yay!";
                    bot.sendMessage({
                        to: channelID,
                        message: winnerMessage,
                        tts: true
                    });
                    toGuess = null;
                }
                break;
            case 'winners':
                var winnerMessage = "The winners are: ";
                for (guy in gameWinners) {
                    winnerMessage += guy + " " + gameWinners[guy] + " times,"
                }
                bot.sendMessage({
                    to: channelID,
                    message: winnerMessage,
                    tts: true
                });
                break;
            case 'img':
                if (args[1] == null) {
                    bot.sendMessage({
                        to: channelID,
                        message: 'Search for an image by entering keywords after !img'
                    });
                } else {
                    var imgSearchTerm = '';
                    for(var i = 1; i < args.length; i++){
                        imgSearchTerm += args[i];
                    }
                    imgSearch(imgSearchTerm, channelID);
                }
                break;
            case 'gif':
                if (args[1] == null) {
                    bot.sendMessage({
                        to: channelID,
                        message: 'Search for an gif by entering keywords after !gif'
                    });
                } else {
                    var gifSearchParameter = "";
                    for (var y = 1; y < args.length; y++){
                        gifSearchParameter += args[y];
                    }
                    gifSearch(gifSearchParameter, channelID);
                }
                break;
            case 'meaningoflife':
                var meaning;
                switch (Math.floor(Math.random() * 2) + 1){
                    case 1:
                        meaning =  'BIER!';
                        break;
                    case 2:
                        meaning =  '42';
                        break;
                }
                bot.sendMessage({
                    to: channelID,
                    message: meaning,
                    tts: true
                });
                break;
            case 'stefan':
                var stefan;
                switch (Math.floor(Math.random() * 4) + 1){
                    case 1:
                        stefan =  'STEFAN!';
                        break;
                    case 2:
                        stefan =  'steeeeeeeefan';
                        break;
                    case 3:
                        stefan =  'no';
                        break;
                    case 4:
                        stefan =  'nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnniggu';
                        break;
                }
                bot.sendMessage({
                    to: channelID,
                    message: stefan,
                    tts: true
                });
                break;
            default:
                break;
        }
    }
});

function isNumber(obj) {
    return !isNaN(parseInt(obj))
}

function imgSearch(searchParam, channelID){
    client.search(searchParam).then(function(images) {
        if(images[0] == undefined){
            bot.sendMessage({
                to: channelID,
                message: 'img not found :c'
            });
        } else {
            bot.sendMessage({
                to: channelID,
                message: images[0].url
            });
        }
    });
}

function apiRequest(url, path, searchParam, channelID){
    var options = {
        host: url,
        port: 80,
        path: path,
        method: 'GET'
    };

    http.request(options, function(res) {
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    }).end();
}

function gifSearch(searchParam, channelID){
    giphy.search({
        q: searchParam,
        limit: 1
    }, function (err, res) {
        if(res.data[0] == undefined){
            bot.sendMessage({
                to: channelID,
                message: 'gif not found :c'
            });
        } else {
            bot.sendMessage({
                to: channelID,
                message: res.data[0].url
            });
        }
    });
}