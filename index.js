var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

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
            case 'SANIC':
                bot.sendMessage({
                    to: channelID,
                    message: 'SAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANIC',
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
                    console.log("guess by " + key + " was: " + guesses[key]);
                    if (parseInt(guesses[key]) == parseInt(toGuess)) {
                        winners.push(key);
                    }
                }
                if (winners.length == 0) {
                    bot.sendMessage({
                        to: channelID,
                        message: 'No one won. You are all idiots.. The number was ' + toGuess,
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
            default:
                break;
        }
    }
});

function isNumber(obj) {
    return !isNaN(parseInt(obj))
}