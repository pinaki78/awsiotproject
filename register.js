var AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-1';

var crypto = require('crypto');
var endpoint = "<endpoint prefix>.iot.<region>.amazonaws.com";
var iot = new AWS.Iot();
var iotdata = new AWS.IotData({endpoint: endpoint});
var topic = "registration";
var type = "MySmartIoTDevice"

//Create n AWS IoT Things
for(var i = 1; i < n+1; i++) {
  var serialNumber = "SN-"+crypto.randomBytes(Math.ceil(12/2)).toString('hex').slice(0,15).toUpperCase();
  var clientId = "ID-"+crypto.randomBytes(Math.ceil(12/2)).toString('hex').slice(0,12).toUpperCase();
  var activationCode = "AC-"+crypto.randomBytes(Math.ceil(20/2)).toString('hex').slice(0,20).toUpperCase();
  var thing = "myThing"+i.toString();
  var thingParams = {
    thingName: thing
  };
  
  iot.createThing(thingParams).on('success', function(response) {
    //Thing Created!
  }).on('error', function(response) {
    console.log(response);
  }).send();

  //Publish JSON to Registration Topic

  var registrationData = '{\n \"serialNumber\": \"'+serialNumber+'\",\n \"clientId\": \"'+clientId+'\",\n \"device\": \"'+thing+'\",\n \"endpoint\": \"'+endpoint+'\",\n\"type\": \"'+type+'\",\n \"activationCode\": \"'+activationCode+'\",\n \"activated\": \"false\",\n \"email\": \"not@registered.yet\" \n}';

  var registrationParams = {
    topic: topic,
    payload: registrationData,
    qos: 0
  };

  iotdata.publish(registrationParams, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    // else Published Successfully!
  });
  setTimeout(function(){},n);
}

//Checking all devices were created

iot.listThings().on('success', function(response) {
  var things = response.data.things;
  var myThings = [];
  for(var i = 0; i < things.length; i++) {
    if (things[i].thingName.includes("myThing")){
      myThings[i]=things[i].thingName;
    }
  }

  if (myThings.length = n){
    console.log("myThing1 to n created and registered!");
  }
}).on('error', function(response) {
  console.log(response);
}).send();

console.log("Registration data on the way to Lambda and DynamoDB");
