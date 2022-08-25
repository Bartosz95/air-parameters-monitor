#!/bin/bash

rm -rf /opt/bolo/sensors/
mkdir -p /opt/bolo/sensors/
cp -f ./read_sensors.py /opt/bolo/sensors/read_sensors.py
chmod +x /opt/bolo/sensors/read_sensors.py

mkdir -p /var/log/bolo/sensors/
touch /var/log/bolo/sensors/logs
chmod 666 /var/log/bolo/sensors/logs

sed -i '/read_sensors/d' /etc/rc.local
sed -i '$d' /etc/rc.local
printf "python /opt/bolo/sensors/read_sensors.py > /var/log/bolo/sensors/logs 2>&1 &\nexit 0\n" >> /etc/rc.local


echo "Installed succesfully"


exit 0