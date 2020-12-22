const axios = require("axios");
const { JSDOM } = require("jsdom");
const fs = require("fs")
const objhash = require("object-hash")

const TIME_INTERVAL = 1000 * 40;
const URL = "https://ktu.edu.in/eu/core/announcements.htm";
// const URL = "https://www.google.com/"


const createObj = (dateElement, notificationElement) => {
    const myObj = {}
    dateElement.forEach((element, index) => {
        const arr = element.textContent.split(" ")
        const year = arr[5]
        const month = arr[1]
        const date = arr[2]
        const link = "https://ktu.edu.in/eu/core/announcements.htm"
        // const link = notificationElement[index].querySelector("a") ? notificationElement[index].querySelector("a").href : null
        myObj[index] = {
            link:link,
            year,
            month,
            date,
            notification:sanitizeString(notificationElement[index].textContent)
        }
    })
    return myObj
}

const sanitizeString = (string1) => {
    string1 = string1.replace(/(\r\n|\n|\r|\t|\t\n)/gm,"")
    string1 = string1.split(" ")
    newList = []
    for(let i = 0;  i < string1.length; i++){
        if(string1[i] !== ""){
            newList.push(string1[i])
        }
    }
    return newList.join(" ")
}

const findNotification = (month, year, arrayOfElements) => {
    const obj = []
    for(const element in arrayOfElements){
        if(arrayOfElements[element].month == month && arrayOfElements[element].year == year){
            const object = arrayOfElements[element]
            const sentence = {
                title:`***${object.date} ${object.month} ${object.year}***`,
                url:`https://ktu.edu.in/${object.link}`,
                description:"```" + object.notification +"```"
            }
            obj.push(sentence)
        }
    }
    return obj
}

const checkIfChanged = (hash) => {
    const data = fs.readFileSync('hash.txt', 'utf8')
    return data === hash ? false : true
}

const logXML = async (functionToBeExecuted) => {
    console.log(`LOGXML STARTED .....`)
  const response = await axios.get(URL)
  const dom = new JSDOM(response.data)
  const dateElement = dom.window.document.querySelectorAll("td[width = '9%'] b");
  const notificationElement = dom.window.document.querySelectorAll("tr li");
  const arrayOfElements = createObj(dateElement, notificationElement)

  var datahash = objhash(arrayOfElements)
  console.log(datahash)
  var oldHash = fs.readFileSync('hash.txt', 'utf8')
  if(oldHash == datahash){
    console.log("Nothing Changed");
  } else {
    fs.writeFile('hash.txt',datahash, (err) => {
        if(err) throw err
        console.log("done")
    })
    var data = JSON.stringify(arrayOfElements)
    fs.writeFile('data.json', data, function (err) {
        if (err) throw err;
        console.log('Saved!');
        functionToBeExecuted(arrayOfElements)
    });
  }

//   if(checkIfChanged(datahash)){
//     fs.writeFile('hash.txt',datahash, (err) => {
//         if(err) throw err
//         console.log("done")
//     })
//     var data = JSON.stringify(arrayOfElements)
//     fs.writeFile('data.json', data, function (err) {
//         if (err) throw err;
//         console.log('Saved!');
//         functionToBeExecuted(arrayOfElements)
//     });
//   } else {
//       console.log("Nothing Changed");
//   }
};


const sendIntervalNotification = async (functionToBeExecuted) => {
    console.log(`Searching....`);
    const loopingFunction = () => logXML(functionToBeExecuted)
    setInterval(loopingFunction, TIME_INTERVAL)
}

const functionToBeExecuted = (data) => console.log(`Hello`);

sendIntervalNotification(functionToBeExecuted)

const checkByDetails = async (month, year, functionToBeExecuted) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        let arrayOfElements = JSON.parse(data)
        let obj = findNotification(month, year, arrayOfElements)
        functionToBeExecuted(obj)
    })
}

const getFirstTenObjects = (functionToBeExecuted) =>{
    fs.readFile('data.json', 'utf8', (err, data) => {
        let arrayOfElements = JSON.parse(data)
        let arrayToBeSent = []
        for(let element in arrayOfElements){
            if (element < 10){
                arrayToBeSent.push(arrayOfElements[element])
            }
        }
        functionToBeExecuted(arrayToBeSent)
    })
}

// checkByDetails("Aug","2020" )
// module.exports = {sendIntervalNotification, checkByDetails, getFirstTenObjects}

// setTimeout(() => {
//     checkByDetails("Aug", "2020")
// }, 1000)
