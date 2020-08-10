client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
	if (!channel) return;

	channel.send(`Welcome to the server, ${member}!`);
});

// initializing objects and setting bot's activities.
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
            value: "To reply to the bot verification test. "
        },
        {
            name : "+avatar", 
            value: "To see your avatar or another user's avatar . "
        },
        {
            name : "+activate", 
            value: "To verify your account and et the 'Members' Role . "
        },
        {
            name : "+link", 
            value: "to get the bot's invite link. "
        },
        {
            name : "+roles", 
            value: "To get this servers Role list. "
        },
        {
            name : "+members", 
            value: "To get this server's Members List. "
        },
        {
            name : "+commands", 
            value: "To get this bot's Commands List . "
        },
    ]
    // every 20 secounds the bot chenges its activity. 
    setInterval( () => {
        client.user.setActivity(`${PLAYING_WITH} ${ACTIVITY[Math.floor(Math.random() * 10)]}` );
    }, 20000);
    
    console.log("bot is ready.");
});