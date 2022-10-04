require('dotenv').config({path : "C:/Users/dasad/Desktop/Application/.env"})

const { Client ,WebhookClient } = require('discord.js');
const client = new Client({partials:
    ['Message','Reaction']
});

const webhookClient = new WebhookClient(process.env.WEBHOOK_ID,process.env.WEBHOOK_TOKEN);

const PREFIX = "$";


client.on('ready',()=>{
    console.log(`${client.user.tag} has logged in.`)
});

client.on('message',async (message)=>{
    if(message.author.bot) return;
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME,...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
        if(CMD_NAME==='kick'){
            if(!message.member.hasPermission('KICK_MEMBERS')){
                return message.reply('You do not have permission to use that command');
            }
            if(args.length ===0){
                return message.reply('Please provide an ID');
            }
            const member = message.guild.members.cache.get(args[0]);

            if(member){
                member
                .kick()
                .then((member)=>{
                    message.channel.send(`${member} was kicked.`);
                })
                .catch((err) =>{
                    message.channel.send("I do not have permissions :(");
                });
            }
            else{
                message.channel.send("Member was not found");
            }
        }
        else if(CMD_NAME==='ban'){
            if(!message.member.hasPermission('BAN_MEMBERS')){
                return message.reply('You do not have permission to use that command');
            }
            if(args.length === 0){
                return message.reply("Please provide an ID");
            }
            try{
               const user =  await message.guild.members.ban(args[0]);
               message.channel.send('User banned successfully');
            } catch(err){
                console.log(err);
                message.channel.send('An error occured.Either I do not have permission or user was not found.');
            }

        }
        else if(CMD_NAME==='announce'){
            console.log(args);
            const msg  = args.join('');
            console.log(msg);
            webhookClient.send(msg);
        }
    }
});

client.on('messageReactionAdd',(reaction,user)=>{

    console.log("Hello");
    const {name} = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id==='1015141510171340872'){
        switch(name){
            case '🍎':
            member.roles.add('1015138553019256862');
                break;
            case '🍌':
                member.roles.add('1015138885010980875');
                break;
            case '🍇':
                member.roles.add('1015138706409132043');
                break;
            case '🍑':
                member.roles.add('1015138635269537872');
                break;
        }
    }
});
client.on('messageReactionRemove',(reaction,user)=>{

    console.log("Byeee");
    const {name} = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id==='1015141510171340872'){
        switch(name){
            case '🍎':
            member.roles.remove('1015138553019256862');
                break;
            case '🍌':
                member.roles.remove('1015138885010980875');
                break;
            case '🍇':
                member.roles.remove('1015138706409132043');
                break;
            case '🍑':
                member.roles.remove('1015138635269537872');
                break;
        }
    }
})


client.login(process.env.DISCORD_JS_TOKEN);  