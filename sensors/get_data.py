# -*- coding:utf-8 -*-
"""
  *@file get_data.ino
  *@brief Read ambient temperature and relative humidity and print them to serial port.
  *@copyright  Copyright (c) 2010 DFRobot Co.Ltd (http://www.dfrobot.com)
  *@licence     The MIT License (MIT)
  *@author [fengli](li.feng@dfrobot.com)
  *@version  V1.0
  *@date  2020-12-02
  *@get from https://www.dfrobot.com
  *@https://github.com/DFRobot/DFRobot_DHT20
"""
import sys
import time
from dotenv import load_dotenv, dotenv_values
import paho.mqtt.publish as publish
from paho.mqtt import client as mqtt_client
import json



sys.path.append("../")
from DFRobot_DHT20 import *

IIC_MODE         = 0x01            # default use IIC1
IIC_ADDRESS      = 0x38           # default i2c device address
'''
   # The first  parameter is to select iic0 or iic1
   # The second parameter is the iic device address
'''
dht20 = DFRobot_DHT20(IIC_MODE ,IIC_ADDRESS)
"""
     @brief Initialize function
"""
dht20.begin()

"""
setup MQTT connection
"""

load_dotenv()
config = dotenv_values(".env") 

MQTT_HOST = config['MQTT_HOST']
MQTT_PORT = config['MQTT_PORT']
MQTT_CLIENT = config['MQTT_CLIENT']
MQTT_TOPIC = config['MQTT_TOPIC']
MQTT_SUBTOPIC = config['MQTT_SUBTOPIC']
MQTT_USERNAME = config['MQTT_USERNAME']
MQTT_PASSWORD = config['MQTT_PASSWORD']


MQTT_PATH= MQTT_TOPIC + "/" + MQTT_SUBTOPIC

def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)
    # Set Connecting Client ID
    client = mqtt_client.Client(MQTT_CLIENT)
    client.username_pw_set(MQTT_USERNAME, MQTT_PASSWORD)
    client.on_connect = on_connect
    client.connect(MQTT_HOST, MQTT_PORT)
    return client

def run():
    client = connect_mqtt()
    client.loop_start()
    publish(client)
    client.loop_stop()

def publish(client):
    while True:
        time.sleep(30)
        MQTT_MSG=json.dumps({"temperature": dht20.get_temperature(), "humidity": dht20.get_humidity()})
        result = client.publish(MQTT_PATH, MQTT_MSG)
        # result: [0, 1]
        status = result[0]
        if status == 0:
            print(f"Send `{msg}` to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")
       

if __name__ == '__main__':
    run()

# while True:
#   #Read ambient temperature and relative humidity and print them to terminal
#   MQTT_MSG=json.dumps({"temperature": dht20.get_temperature(), "humidity": dht20.get_humidity()})
  
#   print("temperature::%f C"%dht20.get_temperature())
#   print("humidity::%f RH"%dht20.get_humidity())
#   publish.single(MQTT_PATH, MQTT_MSG , hostname=MQTT_HOST)
 

 
#   time.sleep(30)
