require('dotenv').config();
import {InfluxDB} from "influx"

const influx = new InfluxDB({
    host: process.env.INFLUX_HOST,
    database: process.env.INFLUX_DB,
    port: Number(process.env.INFLUX_PORT)
});

//aanmaken van database als deze nog niet bestaat
influx.createDatabase(process.env.INFLUX_DB)

let mqtt=require('mqtt');
let client = mqtt.connect(`mqtt://${process.env.MQTT_HOST}`, {
  clientId: process.env.MQTT_ID,
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASS,
  clean:true});

client.on('connect', onConnected);
client.on('message', onMessageReceived);

function writeData(data:any) {
    return influx.writeMeasurement('tph', [
        {
            tags: { dev_id : data.dev_id},
            fields: {
                temperature: data.payload_fields.temperature,
                humidity: data.payload_fields.humidity,
                pressure: data.payload_fields.pressure,
                // spreadfactor:
                gateways: data.metadata.gateways[0].gtw_id,
                rssi: data.metadata.gateways[0].rssi,
                snr: data.metadata.gateways[0].snr,
                batteryvoltage: data.payload_fields.batteryVoltage,
            }
        }
    ])
}

function onConnected(){
    client.subscribe(process.env.MQTT_TOPIC);
    // console.log(`connected to channel ${process.env.MQTT_TOPIC}`);
}

function onMessageReceived(topic, message){
    let data = JSON.parse(message);
    // console.log(data)
    // console.log("temperatuur: ", data.payload_fields.temperature)
    // console.log("vochtigheid: ", data.payload_fields.humidity)
    // console.log("luchtdruk: ", data.payload_fields.pressure)
    // console.log("id: ", data.dev_id)
    // console.log("spreadfactor: ", data.payload_fields.temperature)
    // console.log("#gateway ", data.metadata.gateways[0].gtw_id)
    // console.log("min RSSI: ", data.metadata.gateways[0].rssi)
    // console.log("min SNR: ",data.metadata.gateways[0].snr)
    // console.log("batterij voltage: ", data.payload_fields.batteryVoltage)
    // console.log("");
    writeData(data)
        .then(() => {
            influx.query('SELECT * FROM tph')
                .then( (data)=>{
                    data.forEach( (row:any) => {
                        console.log(
                            row.dev_id,
                            row.temperature,
                            row.humidity,
                            row.pressure,
                            row.gateways,
                            row.rssi,
                            row.snr,
                            row.batteryvoltage
                            )
                    })
                }).catch(err => console.log(err))
        });
}
