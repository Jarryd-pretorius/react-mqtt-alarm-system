/* eslint-disable no-undef */
import Paho from 'paho-mqtt'; 
import { useDispatch } from 'react-redux';


var host="localhost";//change this
var port=9001;

export const tags = {
   aiWinderVerticalPos: "aiWinderVerticalPos",
   lrActualVelocity: "lrActualVelocity",
   WinderHomePos: "WinderHomePos",
   CylEngagePos: "CylEngagePos",
   CylBottomPos: "CylBottomPos",
   WinderAcc: "WinderAcc",
   WinderEngageVel: "WinderEngageVel",
   WinderBottomVel: "WinderBottomVel",
   lrActualTorque: "lrActualTorque",
   lrActualPosition: "lrActualPosition"
}

function onConnectionLost(){
console.log("connection lost");
const connected_flag=0;
}
function onFailure(message) {
console.log("Failed");
setTimeout(MQTTconnect, reconnectTimeout);
}

function onMessageArrived(r_message){
let out_msg="Message received "+r_message.payloadString+"<br>";
 out_msg=out_msg+"Message received Topic "+r_message.destinationName;
const parsedObject = JSON.parse(r_message.payloadString)



}

function onConnected(recon,url){
console.log(" in onConnected " + reconn);
}

function onConnect() {
 // Once a connection has been made, make a subscription and send a message.
connected_flag=1
console.log("on Connect "+connected_flag);
//mqtt.subscribe("sensor1");
//message = new Paho.MQTT.Message("Hello World");
//message.destinationName = "sensor1";
//mqtt.send(message);
sub_topics();
}

export function MQTTconnect() {
var s = host;
var p = port;
if (p!="")
{
    console.log("ports");
   port=parseInt(p);
   console.log("port " +port);
   }
if (s!="")
{
   host=s;
   console.log("host");
   }
console.log("connecting to "+ host +" "+ port);
var x=Math.floor(Math.random() * 10000); 
var cname="OIYA-"+x;
mqtt = new Paho.MQTT.Client(host,port,cname);
var options = {
   timeout: 3,
   onSuccess: onConnect,
   onFailure: onFailure,
 
};

   mqtt.onConnectionLost = onConnectionLost;
   mqtt.onMessageArrived = onMessageArrived;

mqtt.connect(options);
return false;


}
function sub_topics(){
   if (connected_flag==0){
   out_msg="<b>Not Connected so can't subscribe</b>"
   console.log(out_msg);
   return false;
   }
   //var stopic= document.forms["subs"]["Stopic"].value;
   var stopic= "PHAMPLC";
   //var stopic= "setTag";
   console.log("Subscribing to topic: "+stopic);
   mqtt.subscribe(stopic);
   return false;
}

function send_message(payload){
   //document.getElementById("messages").innerHTML ="";
   if (connected_flag==0){
   out_msg="<b>Not Connected so can't send</b>"
   console.log(out_msg);
   document.getElementById("messages").innerHTML = out_msg;
   return false;
   }
   //console.log(msg);
   console.log(payload);

   message = new Paho.MQTT.Message(payload);
   //if (topic=="")
   //    message.destinationName = "test-topic"
   //else
   //    message.destinationName = topic;
   message.destinationName = "setTag";
   mqtt.send(message);
   return false;
}


function MQTTstartHmi()
{
    send_message("hmiStartPB=1");
}
