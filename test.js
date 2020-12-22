const axios = require("axios")
const {JSDOM} = require("jsdom")

const URL = "https://ktu.edu.in/eu/core/announcements.htm";

// const response = await axios.get(URL)
const sendReq = async () => {
    const response = await axios.get(URL)
    const dom = new JSDOM(response.data)
    const notificationElement = dom.window.document.querySelectorAll("tr li");
    notificationElement.forEach(element => {
        if(element.querySelector("a")){
            console.log(element.querySelector("a").href)
        } else {
            console.log(`Not there`);
        }
    })
}

// sendReq()

var v1 = "https://ktu.edu.in/eu/att/attachments.htm?download=file&id=FlbFjv29fZw93cl6%2FEyE%2FRJbTo1ScnhXCdZ8Xo889ZU%3D&announcementId=nNodvvFagP7fe%2BBtxf00uc6hKt7WQquRDeU30mQx9%2BY%3D&fileName=CoAcirculartoB.Archcolleges.pdf&downloadType=olNYP3YZjviPBgDmKLUASB4IiXBPYm8%2BWXYn%2BjdKkGk%3D"

var v2 = "https://ktu.edu.in/eu/att/attachments.htm?download=file&id=21Ry0rYd2AMOErtmon9XR2ivNIWm2c6c15Q84ECqG%2Bc%3D&announcementId=gtCNSIJ3%2F4WUPz52xJGgerAIb261ZdmxB3Lc8WbrIwc%3D&fileName=CoAcirculartoB.Archcolleges.pdf&downloadType=BbyxSG3%2FLgp7fUaH8UGb60Ip2SOnRqj4HPO%2Fuz2MoDw%3D"

v1 == v2 ? console.log("YES"):console.log("NO");