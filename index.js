const auth = require('./auth.json');
const GoogleImages = require('google-images');
const giphy = require('giphy-api')(auth.giphy);
const request = require('request');
const Discord = require("discord.js");
const client = new Discord.Client();
client.login(auth.discord);


const imgClient = new GoogleImages('014542467886679922052:guxkga1igcq', auth.google);

let guesses = {};
let toGuess = null;
let gameWinners = [];


client.on('message', function (msg) {
    if (!msg.author.bot)
        var args = msg.content.substring(1).split(' ');
        if (msg.content.substring(0, 1) == '!') {
            let cmd = args[0];
            switch (cmd) {
                case 'help':
                    msg.tts('Type !guess and a number between 0 and 10 to play the guessing game.');
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
                case  'joke':
                    onJoke(msg);
                    break;
                case 'bekfast':
                    playBekfast(msg);
                    break;
                default:
                    break;
            }
        } else {
            annoyingResponse(msg);
        }
});

function playBekfast(msg){
    playAudioFile(msg, './audio/bekfast.mp3');
}

function annoyingResponse(msg) {
    var args = msg.content.split(' ');
    for(let i = 0; i < args.length; i++){
        if(args[i] == 'marcel' || args[i] == 'stoep' || args[i] == 'stoepker'){
            playAudioFile(msg, './audio/marcel.m4a');
        }
        if(args[i] == 'bekfast' || args[i] == 'ontbijt' || args[i] == 'breakfast' || args[i] == 'avondeten' || args[i] == 'eten'){
            playBekfast(msg);
        }
        if(args[i] == 'brak' || args[i] == 'bertje' || args[i] == 'kater' || args[i] == 'feest' || args[i] == 'party' || args[i] == 'cmon'){
            playAudioFile(msg, './audio/bertje.mp3');
        }
        if(args[i] == 'rock' || args[i] == 'rocken' || args[i] == 'rocku'){
            playAudioFile(msg, './audio/rocku.mp3');
        }
        if(args[i] == 'euro' || args[i] == 'euros' || args[i] == 'geld' || args[i] == 'money' || args[i] == 'doekoe' || args[i] == 'ekkies' || args[i] == 'ekkie'){
            playAudioFile(msg, './audio/euros.mp3');
        }
        if(args[i] == 'fiets' || args[i] == 'fietsen' || args[i] == 'hasj' || args[i] == 'wiet' || args[i] == 'pi2'){
            playAudioFile(msg, './audio/fietsen.mp3');
        }
        if(args[i] == 'kutweer' || args[i] == 'regen' || args[i] == 'weer' || args[i] == 'koud'){
            playAudioFile(msg, './audio/kutweer.mp3');
        }
        if(args[i] == 'dol' || args[i] == 'fijn' || args[i] == 'dolfijn'){
            playAudioFile(msg, './audio/dolfijn.mp3');
        }
        if(args[i] == 'gek' || args[i] == 'lijp' || args[i] == 'gestoord' || args[i] == 'crazy' || args[i] == 'leip'){
            playAudioFile(msg, './audio/gek.mp3');
        }
        if(args[i] == 'welkom' || args[i] == 'welcome' || args[i] == 'kom'){
            playAudioFile(msg, './audio/welkom_short.mp3');
        }
        if(args[i] == 'stoned' || args[i] == 'skaf' || args[i] == 'toeter' || args[i] == 'smoken'){
            playAudioFile(msg, './audio/kankerstoned.mp3');
        }
        if(args[i] == 'station'){
            playAudioFile(msg, './audio/station.mp3');
        }
    }
}

function onJoke(msg) {
    request('http://www.reddit.com/r/jokes/top/.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let json = JSON.parse(body);
            let randomNumber = Math.floor(Math.random() * 25);
            let joke = json.data.children[randomNumber];
            msg.reply(joke.data.title + ": \n\n" + joke.data.selftext);
        }
    })
}

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
    let winners = [];
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
        let winnersMessage = "The winners are: ";
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
    let winnerMessage = "The winners are: ";
    for (guy in gameWinners) {
        winnerMessage += guy + " " + gameWinners[guy] + " times,"
    }
    msg.reply(winnerMessage);
}

function img(msg, args) {
    if (args[1] == null) {
        msg.reply('Search for an image by entering keywords after !img');
    } else {
        let imgSearchTerm = '';
        for (let i = 1; i < args.length; i++) {
            imgSearchTerm += args[i];
        }
        imgSearch(imgSearchTerm, msg);
    }
}

function gif(msg, args) {
    if (args[1] == null) {
        msg.reply('Search for an gif by entering keywords after !gif');
    } else {
        let gifSearchParameter = "";
        for (let y = 1; y < args.length; y++) {
            gifSearchParameter += args[y];
        }
        gifSearch(gifSearchParameter, msg);
    }
}

function meaningOfLife(msg) {
    let meaning;
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

function playAudioFile(message, file) {
    let textChannel = message.channel;
    let guild = message.guild;

    // make sure the text channel is a guild channel (type = text)
    if (textChannel.type != "text") {
        textChannel.send("I can't be invoked in private messages, only in guilds.");
        return;
    }
    // default, will be overwritten by argument if needed
    let voiceChannel = message.member.voiceChannel;
    let play = true;

    let isBusy = isBusyInGuild(guild);

    if (isBusy) {
        play = false;
    }

    if (play){
        if (voiceChannel) {
            playAudio(voiceChannel, file, textChannel);
        }
    }
}

function isBusyInGuild(guild) {

    let connections = Array.from(client.voiceConnections.values());

    for (let i = 0; i < connections.length; i++) {
        let connection = connections[i];

        if (connection.channel.guild == guild) {
            return connection.channel;
        }
    }
    return false;
}

function playAudio(voiceChannel, file, textChannel) {
    // check for permissions first
    if (!voiceChannel.permissionsFor(client.user.id).has("CONNECT")) {
        textChannel.send("No permission to join this channel.");
        return;
    }
    if (!voiceChannel.permissionsFor(client.user.id).has("SPEAK")) {
        textChannel.send("No permission to speak in this channel.");
        return;
    }

    voiceChannel.join().then(connection => {

        connection.playFile(file).on("end", () => {
            connection.disconnect();
            voiceChannel.leave();
        });

    }).catch(error => {
        textChannel.send(error.toString());
    });
}