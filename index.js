
const discord = require("discord.js");

const client = new discord.Client();

const token = "NzQwMjU3MDQ1MjYwOTI3MDM3.XymYGA.vPCDFY7RVXtCLFuNCdyxGhImH3c"; 

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

client.on("ready", message => {
    console.log("bot is ready.");
    // every 20 secounds the bot chenges its activity. 
    setInterval( () => {
        client.user.setActivity(`${PLAYING_WITH} ${ACTIVITY[Math.floor(Math.random() * 10)]}` );
    }, 20000);
});
    
let user = {
    username : '', 
    guild: null,
    randomNumbers : [],
    intendedReply: 0,
}

client.on('message', message => {
    let channel = message.channel, 
        author = message.author, 
        guild = message.guild; 

    let msg = message.content.split(" "); 

    switch (message.channel.type) {
        case "dm" : 
            switch (msg[0]){
                case '+reply' : 
                    if(!author.bot && channel.type == 'dm'  && message.author.username == user.username  ){
                        if(user.intendedReply == msg[1]){
                            
                            const role = client.guilds.cache.first().roles.cache.find( role => role.name === "Member");
                            const member = user.guild.members.cache.get(author.id);
                            member.roles.add(role);

                            let questionEmbed = {
                                title : 'Verification complete', 
                                author: {
                                    name: client.user.username, 
                                    icon_url: client.user.displayAvatarURL(), 
                                    url: client.user.displayAvatarURL(),
                                }, 
                                description: "Congratulation you are now a Member",
                                thumbnail: {
                                    url: client.user.displayAvatarURL()
                                }, 
                                timestamp: new Date(),
                                footer: {
                                    text: 'cheers',
                                    icon_url: client.user.displayAvatarURL(),
                                },
                            }
                            message.author.send({
                                embed : questionEmbed
                            });
                            
                            // logic to greeding the user after verifying his/here account.
                            let welcomeChannel = user.guild.channels.cache.find(channel => channel.id === '741979115690786889'); 
                            welcomeChannel.send(`Welcome ${user.username} To the server`);

                            
                        }else{
                            author.send("not quit right, try again");
                        }
                    }
                break ;
            }
            break; 
        case 'text' : 
            switch(msg[0]) {
            
                case '+avatar' :  
                    if(msg[1] == null){
                        // display the avatar of the one who typed the command.
        
                        // display the member's avatar. 
                        let avatarEmbed = {
                            title: "Avatar Link", 
                            url: author.avatarURL() + "?size=1024",
                            author: {
                                name: author.username, 
                                icon_url: author.displayAvatarURL(), 
                                url: author.displayAvatarURL()
                            },
                            image: {
                                url:  author.avatarURL() + "?size=1024"
                            },
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
                            footer: {
                                text:  `requested by ${member.user.username}`, 
                                icon_url: member.user.displayAvatarURL()
                            }
                        }
        
                        channel.send({
                            embed: avatarEmbed
                        }); 
        
                        }
                        
                                    
                    }
                    
                    break ; 
        
                case '+act': 
                    if( user.intendedReply == 0 ){
                        user.randomNumbers = [
                            Math.floor(Math.random() * 10) + 1, 
                            Math.floor(Math.random() * 10) + 1,
                        ]
                    }
                    
                    user.username = message.author.username; 
                    user.guild = guild;
                    user.question = `${user.randomNumbers[0]} + ${user.randomNumbers[1]} = ?`;
                    user.intendedReply = user.randomNumbers[0] + user.randomNumbers[1];
        
        
                    let questionEmbed = {
                        title : 'Verification Test', 
                        author: {
                            name: client.user.username, 
                            icon_url: client.user.displayAvatarURL(), 
                            url: client.user.displayAvatarURL(),
                        }, 
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
                        footer: {
                            text: 'cheers',
                            icon_url: client.user.displayAvatarURL(),
                        },
                    }
                    message.author.send({
                        embed : questionEmbed
                    });
                    break ; 
                    
                case '+link':
                    channel.send(INVITE_LINK); 
                    break ; 
        
                case '+roles':
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
                        author : {
                            name: client.user.username, 
                            icon_url: client.user.displayAvatarURL(),
                            url: INVITE_LINK,
                        }, 
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
        
                case "+members" : 
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
                        author : {
                            name: client.user.username, 
                            icon_url: client.user.displayAvatarURL(),
                            url: INVITE_LINK,
                        }, 
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
                   
            }
            break; 
    }
   
});

client.login(token);