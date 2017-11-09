var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

var guesses = [];
var number = null;

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
        var args = message.substring(2).split(' ');
        var cmd = args[0];

        switch (cmd) {
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: '/tts Type !guess and a number between 0 and 10 to play the guessing game.'
                });
                break;
            case 'guess':
                if(number == null){
                    number = Math.floor(Math.random() * 10) + 1
                }
                if (args[1] == null) {
                    bot.sendMessage({
                        to: channelID,
                        message: '/tts Please enter a number to play'
                    });
                } else {
                    guesses[user.username] = args[1];
                    bot.sendMessage({
                        to: channelID,
                        message: '/tts ' + user.username + '  has entered' + args[1]
                    });
                }
                break;
            case 'results':
                var winners = [];
                guesses.forEach(function (guess, name) {
                    if(guess == number){
                        winners.push(name);
                    }
                });
                number = null;
                if(winners.length = 0){
                    bot.sendMessage({
                        to: channelID,
                        message: '/tts No one won. You are all idiots..'
                    });
                } else {
                    var winnerMessage = "/tts The winners are: ";
                    winners.forEach(function (winner) {
                       winnerMessage += winner + " "
                    });
                    winnerMessage += " Yayy!";
                    bot.sendMessage({
                        to: channelID,
                        message: winnerMessage
                    });
                }
                break;
            default:
                break;
        }
    }
});