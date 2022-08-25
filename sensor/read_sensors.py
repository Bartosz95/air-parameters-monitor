from sense_hat import SenseHat
from pymongo import MongoClient
import time

# mensure
round_number = 2

# database
host = "localhost"
db_name = "sensors"
collection_name = "device1"


sense = SenseHat()
round_number = "{:."+str(round_number)+"f}"

hostname="mongodb://" + host + "/sensors"
cluster = MongoClient(hostname)
db = cluster[db_name]
collection = db[collection_name]

while 1:
    localtime = time.localtime()
    sec = time.strftime("%S", localtime)
    while (sec != "00" ) and (sec != "30" ):
        time.sleep(1)
        localtime = time.localtime()
        sec = time.strftime("%S", localtime)
        
    # time
    hour = time.strftime("%H:%M:%S", localtime)
    day = time.strftime("%d/%m/%Y", localtime)
    
    # mensure
    temp = sense.get_temperature()
    temph = sense.get_temperature_from_humidity()
    tempp = sense.get_temperature_from_pressure()
    tempa = float(round_number.format((temp + temph + tempp)/3))
    pressure = float(round_number.format(sense.get_pressure()))
    humidity = float(round_number.format(sense.get_humidity()))

    # save in db
    post = {"date": day, "time": hour ,"temperature": tempa, "humidity": humidity, "pressure": pressure }
    collection.insert_one(post)
    
    # 
    print(post)
    time.sleep(27)


