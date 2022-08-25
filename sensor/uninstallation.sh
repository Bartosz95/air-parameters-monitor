#!/bin/bash

rm -rf /opt/bolo/sensors/
rm -rf /var/log/bolo/
sed -i '/read_sensors/d' /etc/rc.local
