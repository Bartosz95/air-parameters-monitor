# Air Parameters Monitor

## Abstract
The basic assumption for the project was to inform the residents about the current air condition in the room. The information should include three parameters:
- temperature
- humidity
- pressure
The values are collected and can be displayed by User Interface in real time. There is also an API which can be used to fetch information in JSON format.

## Technologies
- Raspberry PI
- Python
- NodeJS
- MongoDB
- Angular
- Bootstrap

# Requirements
- Programmable board Raspberry PI 3 
- Raspberry Sense HAT
- Docker
- docker-compose

## Description
System consists of four components: 
- sensor collect air air parameters, 
- database keeps all measurements, 
- API which handle endpoints and save data to DB, 
- GUI displays information to the user.

Communication between components works through http interface. It means that every component can be in difference localization and data is sent wireless.
In the scheme below we can see these four components. On the left we can see a sensor which is built in Raspberry PI with Sense HAT extension. On this programmable board is installed a program written in Python which delivers air parameters to the API. API gets requests from sensors and writes information to MongoDB instances. API is written in NodeJS. On the right hand side you can see the GUI, written in Angular, Which pulls data from the API and displays them to the Users.


![](./doc/graphs.png)

## Installation
By default you have to install three components: API sensor and GUI. You don't have to install a database because it comes with an API.

### Install API and database
You can install these two components in every machine with installed Docker and docker-compose. Obviously machines have to have internet access. To install API and BD just get the project from repo. Do it by clone it or [download it as a zip](https://github.com/Bartosz95/measuring-air-parameters/archive/refs/heads/master.zip) and unpack it.
```
git clone https://github.com/Bartosz95/measuring-air-parameters.git
```
Next enter this project directory/api and run.
```
docker-compose up
```
It gets you access to the API on API URL=http://localhost:3000/api/v1/. If you want to, you can set access to your localhost instance outside. If you want to you can set static IP in this machine and configure your router to forward traffic to this host.

### Install sensor
For installation you have to manually install a sensor application on your Raspberry board. First, connect the extension to the board.
Below you have a command which instals a library to handle this Sense HAT.
```
pip install sense-hat request
```
Then you have to pull the project from the repository. Please clone this project or [download zip](https://github.com/Bartosz95/measuring-air-parameters/archive/refs/heads/master.zip) and unpack it.
```
git clone https://github.com/Bartosz95/measuring-air-parameters.git
```
Enter the project directory and next to the sensor directory. Now you have to set permissions for the installation script. Just execute the command below.
```
sudo chmod +x installation.sh
```
Now you have run the installation script with the URL address where the API is. The command creates a service in the machine and starts sending POST requests to a given API URL address.
```
sudo ./installation.sh <<API_URL>>
```
If you install a sensor on the same machine as the API use http://localhost:3000 instead of <<API_URL>>.

### Install GUI
To install GUI, clone this project or [download zip](https://github.com/Bartosz95/measuring-air-parameters/archive/refs/heads/master.zip) and unpack it.
```
git clone https://github.com/Bartosz95/measuring-air-parameters.git
```
Then enter to gui directory and adapt <<API_URL>> parameter in nginx.conf. Similar to sensor change <<API_URL>> with http://localhost:3000 if you run GUI and API on the same machine. 

```
    server {
        listen 80;
        root /usr/share/nginx/html;
        index index.html;

        location /api/v1/ {
            proxy_pass  <<API_URL>>/api/vi/ ;
        }
    }
```

Then run

```
docker-compose up
```

## Tutorial

### GUI
Go to http://localhost/ to open the GUI then you will see page like below. There are three graphs. The Temperature, Pressure and Humidity. New values will appears every 30 seconds. Max variable values on one graph is 30.

![](./doc/diagram.png)

### API

You can run POST requests like below.
```
curl -XPOST -H "Content-Type: application/json" {"date": “13/01/2021”, "time": “22:30:30”,"temperature": 23.5, "humidity": 51.3, "pressure": 1124.1} http://localhost:3000/api/v1
```
And pull information by GET requests. 
```
curl http://localhost:3000/api/v1/
```
```
curl http://localhost:3000/api/v1/temperature
```
```
curl http://localhost:3000/api/v1/humidity
```
```
curl http://localhost:3000/api/v1/pressure
```
