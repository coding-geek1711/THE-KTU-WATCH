require("dotenv").config()

const {DISCORD_TOKEN, CHANNEL_ID} = require("./important")
const {Client} = require("discord.js")
const client = new Client()
const {sendIntervalNotification, checkByDetails, getFirstTenObjects, getFirstNObjects} = require("./functions")

const checkContinously = () => {
    const functionToBeExecuted = (arrayOfElements) => {
        console.log(`Sending message`)
        var channel1 = client.channels.cache.get(CHANNEL_ID)
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
const prefix = "n!"
client.login(DISCORD_TOKEN)

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}`);
})

checkContinously()


client.on('message', (message) => {
    if(message.content === `${prefix}status`){
        message.channel.send(`Servers name is ${message.guild.name} and BOT ${client.user.username} is active`)
    }
})


client.on('message', (message) => {
    if(message.content === `${prefix}help`){
        const content = "```" + `My Commands are: \n 1. n!notification \n 2. n!notification calender <month> <year>\n 3. n!notification number <number of notifications you want>\n 4. n!status\n 5. n!help` + "```"
        message.channel.send(content)
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

    if(args[0] == "number"){
        var numberOfNotification = parseInt(args[1], 10)
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
        getFirstNObjects(numberOfNotification, functionToBeExecuted)

    } else if(args[0] == "calender"){
        const functionToBeExecuted = (obj) => {
            obj.forEach(object => {
                console.log(object)
                message.channel.send({embed:object})
            })
        }
        const month = args[1]
        const year = args[2]
        checkByDetails(month, year, functionToBeExecuted)
    }
})

