require("dotenv").config()

const {Client} = require("discord.js")
const client = new Client()
const {sendIntervalNotification, checkByDetails, getFirstTenObjects} = require("./functions")

const checkContinously = () => {
    const functionToBeExecuted = (arrayOfElements) => {
        console.log(`Sending message`)
        var channel1 = client.channels.cache.get(process.env.CHANNEL_ID)
        let arrayToBeSent = []
        for(let element in arrayOfElements){
            if (element < 5){
                arrayToBeSent.push(arrayOfElements[element])
            }
        }
        arrayToBeSent.forEach(object =>{
            const sentence = {
                title:`***${object.date} ${object.month} ${object.year}***`,
                url:`${object.link}`,
                description:"```" + object.notification +"```"
            }
            channel1.send({embed:sentence})

        })
    }
    sendIntervalNotification(functionToBeExecuted)
}
const prefix = "!"
client.login(process.env.DISCORD_TOKEN)

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}`);
})

checkContinously()


client.on('message', (message) => {
    if(message.content === `${prefix}server`){
        message.channel.send(`Servers name is ${message.guild.name}`)
    }
})

client.on('message', (message) => {
    if(message.content === `${prefix}notification`){
        const functionToBeExecuted = (arrayOfElements) => {
            console.log(arrayOfElements.length)
            arrayOfElements.forEach(object => {
                const sentence = {
                    title:`***${object.date} ${object.month} ${object.year}***`,
                    url:`https://ktu.edu.in/${object.link}`,
                    description:"```" + object.notification +"```"
                }

                message.channel.send({embed:sentence})
                // console.log(sentence);
            })
        }
        getFirstTenObjects(functionToBeExecuted)
        // message.channel.send(`Servers name is ${message.guild.name}`)
    }
})

client.on('message', (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return ;
    const args = message.content.slice(prefix.length).trim().split(' ')
    const command = args.shift().toLowerCase()
    const functionToBeExecuted = (obj) => {
        obj.forEach(object => {
            console.log(object)
            message.channel.send({embed:object})
        })
    }
    checkByDetails(args[0], args[1], functionToBeExecuted)
})

