# awsiotproject
Registration JSON would be like below

{
  "clientId": "ID-91B2F06B3F05",
  "serialNumber": "SN-D7F3C8947867",
  "activationCode": "AC-9BE75CD0F1543D44C9AB",
  "activated": "false",
  "device": "myThing1",
  "type": "MySmartIoTDevice",
"email": "test@test.com"
  "endpoint": "<endpoint prefix>.iot.<region>.amazonaws.com"
}


The JSON format for the new IOT devices ready for activation will be like below

{
  "clientId": "ID-91B2F06B3F05",
  "serialNumber": "SN-D7F3C8947867",
  "activationCode": "AC-9BE75CD0F1543D44C9AB",
  "email": "test@test.com"
}
  
  The API end point would be like
  
  End point:https://<prefix>.execute-api.<region>.amazonaws.com/activate
