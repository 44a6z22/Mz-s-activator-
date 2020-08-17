
const discord = require("discord.js");
// import "./guildMemberAdd.js"; 

const client = new discord.Client();

const token = "NzQwMjU3MDQ1MjYwOTI3MDM3.XymYGA.Z-HGQHe2NsvI6nfiAzpAtmnrYhU"; 

const PLAYING_WITH = "with";

const ACTIVITY = [
    "9lawi l3awd",
    "JavaScript",
    "Lanformatik 101",
    "Logic",
    "Formation", 
    "tkhawr", 
    "something he likes",
    "turn on your magic",
    "your head",
    "himself",
]

const INVITE_LINK = "https://discord.com/api/oauth2/authorize?client_id=740257045260927037&permissions=2147483639&scope=bot";
let auth = thum = foot =  {};
let commands = [], customWelcomeChannelName = ''; 

// initializing objects and setting bot's activities and some object the  bot gonna use.
client.on("ready", message => {
    auth  = {
        name: client.user.username, 
        icon_url: client.user.displayAvatarURL(),
        url: client.user.displayAvatarURL(),
    };
    thum = {
        url : client.user.displayAvatarURL()
    }; 
    foot= {
        text: 'cheers',
        icon_url: client.user.displayAvatarURL(),
    };
    commands = [
        {
            name : "+reply", 
            value: "type this to the bot's dm To reply to the bot verification test. "
        },
        {
            name : "+avatar", 
            value: "To see your avatar or another user's avatar . "
        },
        {
            name : "+activate", 
            value: "type this on the server text channels To verify your account and et the 'Members' Role . "
        },
        {
            name : "+link", 
            value: "type this on the server text channels to get the bot's invite link. "
        },
        {
            name : "+roles", 
            value: "type this on the server text channels To get this servers Role list. "
        },
        {
            name : "+members", 
            value: "type this on the server text channels To get this server's Members List. "
        },
        {
            name : "+commands", 
            value: "type this on the server text channels To get this bot's Commands List . "
        },
    ]
    
    // every 20 secounds the bot chenges its activity. 
    setInterval( () => {
        client.user.setActivity(`${PLAYING_WITH} ${ACTIVITY[Math.floor(Math.random() * 10)]}` );
    }, 20000);
    
    console.log("bot is ready.");
});
    
let user = {
    username : '', 
    guild: null,
    randomNumbers : [],
    intendedReply: 0,
}

client.on('guildMemberAdd', member => {

    let commandsEmbed = {
        title: "==== Commands List ====" , 
        color : "#000000", 
        description: "List of commands you can use to interact with this bot .",
        author: auth, 
        thumbnail: thum, 
        fields:  [{ name: '\u200B', value: '\u200B' },commands, { name: '\u200B', value: '\u200B' }], 
        date : new Date(), 
        footer: foot
    }; 

    member.send({
        embed: commandsEmbed
    });
	// member.send();
});


client.on('message', message => {

    let channel = message.channel, 
        author = message.author, 
        guild = message.guild; 

    let msg = message.content.split(" "); 
    
    //check if the message sent to a text channel or to the bot's DMs
    switch (message.channel.type) {
        case "dm" : 
            switch (msg[0]){

                // Reply .
                case commands[0].name : 

                    if(!author.bot && channel.type == 'dm'  && message.author.username == user.username  ){
                        
                        if(user.intendedReply == msg[1]){
                            
                            const role = client.guilds.cache.first().roles.cache.find( role => role.name === "Member");
                            const member = user.guild.members.cache.get(author.id);
                            member.roles.add(role);

                            let congratsEmbed = {
                                title : 'Verification complete',
                                color: "#22bb33",  // success. 
                                author: auth, 
                                description: "Congratulation you are now a Member",
                                thumbnail: thum, 
                                fields:  [
                                    { name: '\u200B', value: '\u200B' },
                                    { name: 'Here the commands you can use', value: "======================="}, 
                                    commands, 
                                    { name: '\u200B', value: '\u200B' }],
                                timestamp: new Date(),
                                footer: foot,
                            }
                            message.author.send({
                                embed : congratsEmbed
                            });
                            
                            // logic to greeding the user after verifying his/here account.
                            let welcomeChannel = user.guild.channels.cache.find(channel => channel.name === customWelcomeChannelName );
                            if(!welcomeChannel){
                                welcomeChannel = user.guild.channels.cache.find(channel => channel.name === 'general'); 
                            } 
                            greetUser(welcomeChannel, user.username);
                            
                    }else{
                            author.send("not quit right, try again");
                        }
                    }
                break ;
                
                // notify 
                case "!notify":
                    
                    //only the bot owner can trigger this command .
                    // the bot owner descriminator is hard coded up untill this point.
                    if(message.author.discriminator == '1371'){
                        if(msg[1] != null ){
                            let thisGuild = client.guilds.cache.find(guild => guild.name == msg[1]); 
                            thisGuild.members.cache.forEach( member => {
                                if(!member.user.bot ){
                                    member.send("lmao"); 
                                     let congratsEmbed = {
                                        title : 'Verification complete',
                                        color: "#22bb33",  // success. 
                                        author: auth, 
                                        description: "Congratulation you are now a Member",
                                        thumbnail: thum, 
                                        fields:  [
                                            { name: '\u200B', value: '\u200B' },
                                            { name: 'Here the commands you can use', value: "======================="}, 
                                            commands, 
                                            { name: '\u200B', value: '\u200B' }],
                                        timestamp: new Date(),
                                        footer: foot,
                                    }
                                    message.author.send({
                                        embed : congratsEmbed
                                    });
                                }
                            });
                        }else{
                            client.guilds.cache.forEach( guild  => {
                                guild.members.cache.forEach( member => {
                                    if(!member.user.bot  ){
                                        member.send("lmao"); 
                                    }
                                    // console.log(member.user.bot)
                                });
                            });
                        }
                         
                    }else {
                        message.author.send("how the fuck did you learn about this?");
                    }
                     
                break; 
            }
        break; 
        case 'text' : 
            switch(msg[0]) {

                // Avatar request
                case commands[1].name :  
                    
                    // display the avatar of the one who typed the command.
                    if(msg[1] == null){
                        
                        // display the member's avatar. 
                        let avatarEmbed = {
                            title: "Avatar Link", 
                            color: "#0095FF",
                            url: author.avatarURL() + "?size=1024",
                            author: {
                                name: author.username, 
                                icon_url: author.displayAvatarURL(), 
                                url: author.displayAvatarURL()
                            },
                            image: {
                                url:  author.avatarURL() + "?size=1024"
                            },
                            timestamp: new Date(),
                            footer: {
                                text:  `requested by ${author.username}`, 
                                icon_url: author.displayAvatarURL()
                            }
                        }
        
                        channel.send({
                            embed: avatarEmbed
                        }); 
        
                    }else{
                        // else get the avatar of the requested member . 
                        // get the mentioned member. 
                        let member = guild.members.cache.get( msg[1].replace(/<|>|@/gi,'') )
                        
                        if( typeof(member) === 'undefined' ){
                            channel.send("can't find this user.");
                        }else{
                            // display the member's avatar. 
                            let avatarEmbed = {
                                title: "Avatar Link", 
                                url: member.user.avatarURL() + "?size=1024",
                                author: {
                                    name: member.user.username, 
                                    icon_url: member.user.displayAvatarURL(), 
                                    url: member.user.displayAvatarURL()
                                },
                                image: {
                                    url:  member.user.avatarURL() + "?size=1024"
                                },
                                timestamp: new Date(),
                                footer: {
                                    text:  `requested by ${author.username} ${author.discriminator}`, 
                                    icon_url: author.displayAvatarURL()
                                }
                            }
            
                            channel.send({
                                embed: avatarEmbed
                            }); 
                        }
                        
                                    
                    }
                    
                    break ; 
        
                // activate 
                case commands[2].name: 

                    // checking if the user is already a member .
                    let counter     = 0 ;
                    // get the authors roles. 
                    let userRole    = guild.members.cache.find(m  => m.id === author.id )._roles; 
                    // get a specific role. 
                    let memberRole  = guild.roles.cache.find(role => role.name === "Member");
                    
                    // check if the user has that specific role
                    userRole.forEach( role => {
                        if (role == memberRole.id) 
                            counter++; 
                    });

                    // if he does have the role tell them they are already a member. 
                    if(counter != 0 ) {
                       let alreadyMember =  {
                            color: '#D90000',
                            title: "You're Already a member.", 
                            author : auth,
                            thumbnail: {
                                url: client.user.displayAvatarURL()
                            }, 
                            description: "Only new members can use this command"
                        }
                        channel.send({
                            embed: alreadyMember
                        });
                        counter = 0 ; 
                        return ;
                    }
                    
                    // if the user doesn't then do the verification.
                     
                    
                    if( user.intendedReply == 0 ){
                        user.randomNumbers = [
                            Math.floor(Math.random() * 10) + 1, 
                            Math.floor(Math.random() * 10) + 1,
                        ]
                    }
                    
                    user.username       = message.author.username; 
                    user.guild          = guild;
                    user.question       = `${user.randomNumbers[0]} + ${user.randomNumbers[1]} = ?`;
                    user.intendedReply  = user.randomNumbers[0] + user.randomNumbers[1];
        
        
                    let questionEmbed = {
                        title : 'Verification Test', 
                        author: auth, 
                        description: "please answer the question so we make sure you're not a robot .",
                        thumbnail: {
                            url: client.user.displayAvatarURL()
                        }, 
                        fields:[
                            {
                                name: "==== Question ====", 
                                value: user.question
                            },
                            {
                                name: "==== how to reply ==== ", 
                                value: "'+reply' and then your answer after. "
                            }
                        ], 
                        timestamp: new Date(),
                        footer: foot
                    }
                    message.author.send({
                        embed : questionEmbed
                    });
                    break ; 
                
                // Link
                case commands[3].name:
                    channel.send(INVITE_LINK); 
                    break ; 
               
                // Roles
                case commands[4].name :
                    // display all the roles in aparticular server. 
                    let rolesString = [];    
        
                    guild.roles.cache.forEach(
                        (role) => {
                        if(role.name != "@everyone"){
                            rolesString.push(
                                role.name
                            ) ; 
                        }
                    });
                    
                    let roles  =  {
                        color: '#0099ff',
                        title: "Roles list.",
                        description: "Here is the List of roles on this server.", 
                        author : auth,
                        thumbnail: {
                            url: client.user.displayAvatarURL()
                        }, 
                        fields: [
                            {
                                name: "==== Roles ====", 
                                value: rolesString
                            },
                            {
                                name: '\u200b',
                                value: '\u200b',
                                inline: false,
                            }
                        ],
                        timestamp: new Date(),
                        footer: {
                            text: 'cheers',
                            icon_url: client.user.displayAvatarURL(),
                        },
                    }
                        
                    channel.send({embed: roles});
                    break ;  
               
                // Members
                case commands[5].name : 
                    let members = [];
                    
                    guild.members.cache.forEach( 
                        (member) => {
                            if( !member.user.bot){
                                members.push(member.user.username)
                            }
                        }
                    );
        
                    let membersEmbed  =  {
                        color: '#0099ff',
                        title: "Members Lists.",
                        description: "Here is the List of Members on this server.", 
                        author : auth, 
                        thumbnail: {
                            url: client.user.displayAvatarURL()
                        }, 
                        fields: [
                        
                            {
                                name: "==== Members ====", 
                                value: members
                            },
                            {
                                name: '\u200b',
                                value: '\u200b',
                                inline: false,
                            }
                        ],
                        timestamp: new Date(),
                        footer: {
                            text: 'cheers',
                            icon_url: client.user.displayAvatarURL(),
                        },
                    }
                    channel.send({
                        embed : membersEmbed
                    })
                    break ; 
               
                // commands 
                case commands[6].name :
                    let commandsEmbed = {
                        title: "==== Commands List ====" , 
                        color : "#000000", 
                        description: "List of commands you can use to interact with this bot .",
                        author: auth, 
                        thumbnail: thum, 
                        fields:  [{ name: '\u200B', value: '\u200B' },commands, { name: '\u200B', value: '\u200B' }], 
                        date : new Date(), 
                        footer: foot
                    }
                    channel.send({
                        embed: commandsEmbed
                    })
                    break ;
                    
            }
        break; 
    }
   
});

function greetUser(channel,  username){
    channel.send(`Welcome ${username} To the server`);
}


client.login(token);