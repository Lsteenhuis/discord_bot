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
    if (!msg.author.bot) {
        let args = msg.content.substring(1).split(' ');
        if (msg.content.substring(0, 1) == '!') {
            if (args.length > 0) {
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
            }
        } else {
            annoyingResponse(msg);
        }
    }
});

function annoyingResponse(msg) {
    let args = msg.content.split(' ');
    for (let i = 0; i < args.length; i++) {
        if (args[i] == 'marcel' || args[i] == 'stoep' || args[i] == 'stoepker') {
            onMarcel(msg);
            return;
        }
        if (args[i] == 'bekfast' || args[i] == 'ontbijt' || args[i] == 'breakfast' || args[i] == 'avondeten' || args[i] == 'eten') {
            playBekfast(msg);
            return;
        }
        if (args[i] == 'brak' || args[i] == 'bertje' || args[i] == 'kater' || args[i] == 'feest' || args[i] == 'party' || args[i] == 'cmon') {
            playAudioFile(msg, './audio/bertje.mp3');
            return;
        }
        if (args[i] == 'rock' || args[i] == 'rocken' || args[i] == 'rocku') {
            playAudioFile(msg, './audio/rocku.mp3');
            return;
        }
        if (args[i] == 'euro' || args[i] == 'euros' || args[i] == 'geld' || args[i] == 'money' || args[i] == 'doekoe' || args[i] == 'ekkies' || args[i] == 'ekkie') {
            onEuros(msg);
            return;
        }
        if (args[i] == 'fiets' || args[i] == 'fietsen' || args[i] == 'hasj' || args[i] == 'wiet' || args[i] == 'pi2') {
            playAudioFile(msg, './audio/fietsen.mp3');
            return;
        }
        if (args[i] == 'kutweer' || args[i] == 'regen' || args[i] == 'weer' || args[i] == 'koud') {
            playAudioFile(msg, './audio/kutweer.mp3');
            return;
        }
        if (args[i] == 'dol' || args[i] == 'fijn' || args[i] == 'dolfijn') {
            playAudioFile(msg, './audio/dolfijn.mp3');
            return;
        }
        if (args[i] == 'gek' || args[i] == 'lijp' || args[i] == 'gestoord' || args[i] == 'crazy' || args[i] == 'leip') {
            playAudioFile(msg, './audio/gek.mp3');
            return;
        }
        if (args[i] == 'welkom' || args[i] == 'welcome' || args[i] == 'kom') {
            playAudioFile(msg, './audio/welkom_short.mp3');
            return;
        }
        if (args[i] == 'stoned' || args[i] == 'skaf' || args[i] == 'toeter' || args[i] == 'smoken') {
            playAudioFile(msg, './audio/kankerstoned.mp3');
            return;
        }
        if (args[i] == 'station') {
            playAudioFile(msg, './audio/station.mp3');
            return;
        }
        if (args[i] == 'x' || args[i] == 'dmx' || args[i] == 'X' || args[i] == 'DMX') {
            playAudioFile(msg, './audio/x.mp3');
            return;
        }
        if (args[i] == 'uhuh') {
            playAudioFile(msg, './audio/uhuh.mp3');
            return;
        }
        if (args[i] == 'snoop' || args[i] == 'dogg') {
            playAudioFile(msg, './audio/snoop_dogg.mp3');
            return;
        }
        if (args[i] == 'bitch') {
            playAudioFile(msg, './audio/bitch.mp3');
            return;
        }
        if (args[i] == 'cash' || args[i] == 'cream' || args[i] == 'dolla' || args[i] == 'dollar') {
            playAudioFile(msg, './audio/cream.mp3');
            return;
        }
        if (args[i] == 'praten' || args[i] == 'galema') {
            playAudioFile(msg, './audio/galema.mp3');
            return;
        }
        if (args[i] == 'gas') {
            playAudioFile(msg, './audio/gas.mp3');
            return;
        }
        if (args[i] == 'ja' || args[i] == 'yes') {
            onJa(msg);
            return;
        }
        if (args[i] == 'waarom' || args[i] == 'waarom?') {
            onWaarom(msg);
            return;
        }
        if (args[i] == 'wat?') {
            playAudioFile(msg, './audio/wat.mp3');
            return;
        }
        if (args[i] == 'jammer') {
            playAudioFile(msg, './audio/jammer.mp3');
            return;
        }
        if (args[i] == 'combo' || args[i] == 'wombo') {
            playAudioFile(msg, './audio/combo.mp3');
            return;
        }
        if (args[i] == 'boem' || args[i] == 'biem') {
            playAudioFile(msg, './audio/biem.mp3');
            return;
        }
        if (args[i] == 'tijd' || args[i] == 'time' || args[i] == 'aint') {
            onTime(msg);
            return;
        }
        if (args[i] == 'gevonden' || args[i] == 'find' || args[i] == 'found') {
            playAudioFile(msg, './audio/pick.mp3');
            return;
        }
        if (args[i] == 'hallo' || args[i] == 'kloontje') {
            playAudioFile(msg, './audio/kloontje.mp3');
            return;
        }
        if (args[i] == 'rik' || args[i] == 'ferwerda') {
            onRik(msg);
            return;
        }
        if (args[i] == 'stefan' || args[i] == 'datema') {
            playAudioFile(msg, './audio/crackie.mp3');
            return;
        }
        if (args[i] == 'pradi' || args[i] == 'predi' || args[i] == 'pradiban' || args[i] == 'prediben') {
            playAudioFile(msg, './audio/pradi.mp3');
            return;
        }
        if (args[i] == 'joint' || args[i] == 'jointjes') {
            playAudioFile(msg, './audio/jointjes.mp3');
            return;
        }
        if (args[i] == 'krakaka' || args[i] == 'shots' || args[i] == 'gunshots' || args[i] == 'schoten') {
            playAudioFile(msg, './audio/krakaka.mp3');
            return;
        }
        if (args[i] == 'gucci' || args[i] == 'gang') {
            playAudioFile(msg, './audio/guccigang.mp3');
            return;
        }
        if (args[i] == 'oh' || args[i] == 'wa') {
            playAudioFile(msg, './audio/ohwaha.mp3');
            return;
        }
        if (args[i] == 'damn' || args[i] == 'dayum') {
            playAudioFile(msg, './audio/dayum.mp3');
            return;
        }
        if (args[i] == 'slokje') {
            playAudioFile(msg, './audio/eem_slokje.mp3');
            return;
        }
        if (args[i] == 'lekker') {
            playAudioFile(msg, './audio/lekker.mp3');
            return;
        }
        if (args[i] == 'heet' || args[i] == 'vuren') {
            playAudioFile(msg, './audio/hetere_vuren.mp3');
            return;
        }
        if (args[i] == 'hatsikidee') {
            playAudioFile(msg, './audio/hatsikidee.mp3');
            return;
        }
        if (args[i] == 'giet' || args[i] == 'oan') {
            playAudioFile(msg, './audio/giet_oan.mp3');
            return;
        }
        if (args[i] == 'nieuwe') {
            playAudioFile(msg, './audio/een_nieuwe.mp3');
            return;
        }
        if (args[i] == 'actie') {
            playAudioFile(msg, './audio/actie.mp3');
            return;
        }
        if (args[i] == 'komen' || args[i] == 'gaan') {
            playAudioFile(msg, './audio/komen_gaan.mp3');
            return;
        }
        if(args[i] == 'lex' || args[i] == 'hermans'){
            onLex(msg);
            return;
        }
    }
}

function onRik(msg) {
    const random = Math.random();
    if(random < 0.3){
        msg.reply('https://media-exp2.licdn.com/media/AAEAAQAAAAAAAAigAAAAJDdmN2JlZWUxLTBkZDktNDk1Mi1hMTNhLWEzZmIxZTUxYzliYQ.jpg');
    } else if (random < 0.6) {
        playAudioFile(msg, './audio/brilsmurf.mp3');
    } else  {
        msg.reply('https://www.idmp1.com/wp-content/uploads/2015/03/wiki_fotolia_68871205_m.jpg');
    }
}

function onLex(msg){
    const random = Math.random();
    if (random < 0.5) {
        playAudioFile(msg, './audio/hodl.mp3');
    } else  {
        msg.reply('https://cdn.vox-cdn.com/thumbor/-D-5v81ETLIBjrs2l_Fw5ZIBZeE=/0x0:960x729/920x613/filters:focal(322x231:474x383)/cdn.vox-cdn.com/uploads/chorus_image/image/56734989/nintchdbpict000297124102.0.jpg');
    }
}

function onTime(msg) {
    const random = Math.random();
    if (random < 0.3) {
        playAudioFile(msg, './audio/time.mp3');
    } else if(random < 0.6)  {
        playAudioFile(msg, './audio/time2.mp3');
    } else {
        playAudioFile(msg, './audio/komen_gaan.mp3');
    }
}


playAudioFile(msg, './audio/marcel.m4a');

function onMarcel(msg){
    if(Math.random() < 0.5){
        playAudioFile(msg, './audio/marcel.m4a');
    } else {
        playAudioFile(msg, './audio/marcel2.mp3');
    }
}
function onWaarom(msg){
    if(Math.random() < 0.5){
        playAudioFile(msg, './audio/waarom.mp3');
    } else {
        playAudioFile(msg, './audio/waarom2.mp3');
    }
}

function playBekfast(msg) {
    playAudioFile(msg, './audio/bekfast.mp3');
}

function onJa(msg){
    if(Math.random() < 0.5){
        playAudioFile(msg, './audio/ja.mp3');
    } else {
        playAudioFile(msg, './audio/ja2.mp3');
    }
}


function onEuros(msg) {
    const random = Math.random();
    if (random < 0.3) {
        playAudioFile(msg, './audio/euros.mp3');
    } else if(random < 0.6)  {
        playAudioFile(msg, './audio/euros2.mp3');
    } else {
        playAudioFile(msg, './audio/cream.mp3');
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
    for (let guy in gameWinners) {
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

    if (play) {
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