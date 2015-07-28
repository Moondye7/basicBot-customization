(function () {

    //Change this to your GitHub username so you don't have to modify so many things.
    var fork = "Moondye7";

    //Define our function responsible for extending the bot.
    function extend() {
        //If the bot hasn't been loaded properly, try again in 1 second(s).
        if (!window.bot) {
            return setTimeout(extend, 1 * 1000);
        }

        //Precaution to make sure it is assigned properly.
        var bot = window.bot; 

        //Load custom settings set below
        bot.retrieveSettings();

        bot.getLocked = function() {
            if($(".wait-list.option.enabled").length > 0) return true;
            else return false;
        }  

        bot.commands.clearqueueCommand = {
            command: 'clearqueue',  //The command to be called. With the standard command literal this would be: !bacon
            rank: 'manager', //Minimum user permission to use the command
            type: 'exact', //Specify if it can accept variables or not (if so, these have to be handled yourself through the chat.message
            functionality: function (chat, cmd) {
                if (this.type === 'exact' && chat.message.length !== cmd.length) return void (0);
                if (!bot.commands.executable(this.rank, chat)) return void (0);
                else {
                    var locked = bot.getLocked();
                    if(locked) {
                        $.ajax({
                        type: 'PUT', 
                        url: 'https://plug.dj/_/booth/lock', 
                        contentType: 'application/json',
                        data: JSON.stringify({
                            isLocked: false,
                            removeAllDJs: false })
                        });
                    }   
                    $.ajax({
                    type: 'PUT', 
                    url: 'https://plug.dj/_/booth/lock', 
                    contentType: 'application/json',
                    data: JSON.stringify({
                        isLocked: true,
                        removeAllDJs: true })
                    });
                    if(!locked) {
                        $.ajax({
                        type: 'PUT', 
                        url: 'https://plug.dj/_/booth/lock', 
                        contentType: 'application/json',
                        data: JSON.stringify({
                            isLocked: false,
                            removeAllDJs: false })
                        });
                    }
                }
            }
        };
        
         function calcMaxUsers(){
            var usersNow = API.getUsers().length; //5
            if(usersNow > localStorage.getItem("RitzenspaltMaxUsers")){
                localStorage.setItem("RitzenspaltMaxUsers", usersNow);
                localStorage.setItem("RitzenspaltTimeMaxUsers", +new Date);
                var nowMaxUsers = new Date(parseInt(localStorage.getItem("RitzenspaltTimeMaxUsers")));
                //console.log("New max users record: "+localStorage.getItem("maxUsers")+"!");
                //console.log(""+nowMaxUsers);
            }
        }
        
        bot.commands.maxUserCommand = {
            command: 'maxusers',  //The command to be called. With the standard command literal this would be: !bacon
            rank: 'manager', //Minimum user permission to use the command
            type: 'exact', //Specify if it can accept variables or not (if so, these have to be handled yourself through the chat.message
            functionality: function (chat, cmd) {
                if (this.type === 'exact' && chat.message.length !== cmd.length) return void (0);
                if (!bot.commands.executable(this.rank, chat)) return void (0);
                else {
                    if (localStorage.getItem("RitzenspaltTimeMaxUsers") === null){
                        //item not set
                        API.sendChat("Die meisten Benutzer, die jemals hier waren: "+localStorage.getItem("RitzenspaltMaxUsers")+"!");
                    } else { 
                        //item set
                        var nowMaxUsers = new Date(parseInt(localStorage.getItem("RitzenspaltTimeMaxUsers")));
                        API.sendChat("Die meisten Benutzer, die jemals hier waren: "+localStorage.getItem("RitzenspaltMaxUsers")+"! This has set on "+nowMaxUsers);
                    }
                }
            }
        };
        
    
       
        bot.commands.baconCommand = {
            command: 'bacon',  //The command to be called. With the standard command literal this would be: !bacon
            rank: 'user', //Minimum user permission to use the command
            type: 'exact', //Specify if it can accept variables or not (if so, these have to be handled yourself through the chat.message
            functionality: function (chat, cmd) {
                if (this.type === 'exact' && chat.message.length !== cmd.length) return void (0);
                if (!bot.commands.executable(this.rank, chat)) return void (0);
                else {
                    API.sendChat("/me Bacon!!!");
                }
            }
        };

        //Load the chat package again to account for any changes
        bot.loadChat();

    }

    //Change the bots default settings and make sure they are loaded on launch

    localStorage.setItem("basicBotsettings", JSON.stringify({
        botName: "Nazibot",
        language: "german",
        chatLink: "https://rawgit.com/Moondye7/basicBot/master/lang/de.json",
        startupCap: 1, // 1-200
        startupVolume: 0, // 0-100
        startupEmoji: true, // true or false
        autowoot: true,
        autoskip: false,
        smartSkip: true,
        cmdDeletion: false,
        maximumAfk: 120,
        afkRemoval: false,
        maximumDc: 60,
        bouncerPlus: true,
        blacklistEnabled: true,
        lockdownEnabled: false,
        lockGuard: false,
        maximumLocktime: 10,
        cycleGuard: true,
        maximumCycletime: 10,
        voteSkip: false,
        voteSkipLimit: 10,
        historySkip: true,
        timeGuard: true,
        maximumSongLength: 10,
        autodisable: false,
        commandCooldown: 30,
        usercommandsEnabled: true,
        skipPosition: 3,
        skipReasons: [
            ["theme", "Dieser Song entspricht nicht dem Genre in diesem Raum. "],
            ["op", "Dieser Song ist auf der Overplayed Liste. "],
            ["history", "Dieser Song ist im Dj Verlauf . "],
            ["mix", "Du hast einen Song gespielt, der gegen die Regeln ist. "],
            ["sound", "Den song, den du gespielt hast, hat entweder schlechten oder gar keinen Sound. "],
            ["nsfw", "Dieser Song enthält NSFW). "],
            ["na", "Dieser Song war nicht verfügbar. "]
            ["max", "Dieser Song war zu lang. "],
        ],
        afkpositionCheck: 15,
        afkRankCheck: "ambassador",
        motdEnabled: true,
        motdInterval: 15,
        motd: "( ͡° ͜◯ ͡°) ＣＬＯＷＮ ＦＩＥＳＴＡ ( ͡° ͜◯ ͡°)",
        socialEnabled: true,
        socialInterval: 20,
        social: "Hier findest du alle Moondye7 Social Links: http://www.twitch.tv/moondye7 Twitch  https://twitter.com/Moondye7 Twitter  https://youtube.com/Moondye7 Youtube  https://www.facebook.com/Moondye7 Facebook",
        filterChat: false,
        etaRestriction: true,
        welcome: true,
        opLink: "http://git.io/vY2N8",
        pluginLink: "https://goo.gl/kop7Md",
        rulesLink: "Es gibt keine Regeln!  Aber bitte sei freundlich! ヽ༼ຈلຈ༽ﾉ ",
        themeLink: "Du kannst Musik aus jedem Genre spielen, solange es aber auch wirklich Musik ist :)",
        fbLink: "https://www.facebook.com/moondye7",
        youtubeLink: "https://www.youtube.com/moondye7",
        twitch: "http://www.twitch.tv/moondye7",
        intervalMessages: [],
        messageInterval: 5,
        songstats: false,
        commandLiteral: "!",
        blacklists: {
            NSFW: "https://rawgit.com/Moondye7/basicBot-customization/master/blacklists/NSFWlist.json",
            OP: "https://rawgit.com/Moondye7/basicBot-customization/master/blacklists/OPlist.json",
            BANNED: "https://rawgit.com/Moondye7/basicBot-customization/master/blacklists/BANNEDlist.json"
        }
    }));

    //Start the bot and extend it when it has loaded.
    $.getScript("https://rawgit.com/Moondye7/basicBot/master/basicBot.js", extend);

}).call(this);
