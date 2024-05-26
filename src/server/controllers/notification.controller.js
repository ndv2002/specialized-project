//Your AccountSID and Auth Token from console.twilio.com
// const accountSid = 'AC7f7e425fc1ddb831bf1327aabd87bd2d';
// const authToken = 'b085e58ff1abd32dbf589b7d23b44995';

// const client = require('twilio')(accountSid, authToken);

// exports.send = async(req, res) => {
//     client.messages
//     .create({
//         body: 'Hello from twilio-node',
//         to: '84782359468', // Text your number
//         from: '12542331797', // From a valid Twilio number
//     })
//     .then((message) => console.log(message.sid));
// };    
const fetch = require('node-fetch');
const db = require("../models");
const Camera = db.camera;
const User = db.user;
const Data=db.data;
const Notification=db.notification;
const Op = db.Sequelize.Op;

let apiKey = "QDLf6lCNn-UAQyE5N_yf_Oqy3ISc_o6ROYm_5ik8xDXaBTF6JjShmF_g70FO0Nwu";

exports.send = async(req, res) => {
    
    const camera_name = await Camera.findByPk(
        req.body.camera_id
    )
    .then((camera) => {
        return camera.name;
    })
    .catch(function (err) {
        res.status(500).send({
            message:
            err.message 
        });
    });  
    
 
    
    Camera.findAll({
        where:{
            id:req.body.camera_id
        },
        include:User
    })
    .then(function(userList){
        for (const keys of userList) {
            // Check if the "users" key exists
            if ('users' in keys && keys.users.length > 0 ) {
              // Iterate over the "users" array
              for (const user of keys.users) {
                    Notification.create({
                        data_link:req.body.data_link,
                        username:user.username,
                        time:req.body.time,
                        content:"Fire in " + camera_name + " at " + req.body.time + "."

                    })
                    .then(data => {
                        
                    })    
                    .catch(err => {
                        
                        
                        });
                    phoneNumber=user.phone
                    if (phoneNumber.startsWith("0")) {
                        // Remove leading 0 and add "+84"
                        phoneNumber = "+84" + phoneNumber.slice(1);
                    } else if (phoneNumber.startsWith("84")) {
                    // Add "+" if it starts with 84
                    phoneNumber = "+" + phoneNumber;
                    } else if (!phoneNumber.startsWith("0")){
                    // Add "+84" if it doesn't start with 0 or 84
                        phoneNumber =  "+84" + phoneNumber;
                    }
                        
                    fetch('https://api.httpsms.com/v1/messages/send', {
                        method: 'POST',
                        headers: {
                            'x-api-key': apiKey,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "content": "Fire in " + camera_name + " at " + req.body.time + ".",
                            "from": "+84782359468",
                            "to": phoneNumber
                        })
                    })
                    .then(response =>{})
                    .then((data) => {});
              }
            }
        }
    })
    .catch(function (err) {
        res.status(500).send({
            message:
            err.message 
        });
    });
    // console.log("user lists:"+JSON.stringify(userList));
   


//   fetch('https://api.httpsms.com/v1/messages/send', {
//       method: 'POST',
//       headers: {
//           'x-api-key': apiKey,
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//           "content": "This is a sample text message",
//           "from": "+84782359468",
//           "to": "+84856729103"
//       })
//   })
//   .then(res => res.json())
//   .then((data) => console.log(data));
};

// const { Vonage } = require('@vonage/server-sdk')
// const { NCCOBuilder, Talk, OutboundCallWithNCCO } = require('@vonage/voice')
// const vonage = new Vonage({
//   apiKey: "7d0bfba9",
//   apiSecret: "Io6b4EDgM0xtQbME"
// })

// const from = "Vonage APIs"
// const to = "84782359468"
// const text = 'A text message sent using the Vonage SMS API'

// // exports.send = async(req, res) => {
// //     await vonage.sms.send({to, from, text})
// //         .then(resp => { console.log('Message sent successfully'); console.log(resp); })
// //         .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
// // };

// exports.send = async(req, res) => {
//     const builder = new NCCOBuilder();
//   builder.addAction(new Talk('This is a text to speech call from Vonage'));
//   const resp = await vonage.voice.createOutboundCall(
//     new OutboundCallWithNCCO(
//       builder.build(),
//       { type: 'phone', number: TO_NUMBER },
//       { type: 'phone', number: VONAGE_NUMBER}
//     )
//   );
// };

