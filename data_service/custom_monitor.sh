#!/bin/bash

while true; do
  device_status=$(smartthings devices:status <DEVICE_ID> -j)

  echo "$device_status" > sample_output.json

  echo "Current AC status: $device_status"
  sleep 10 # Change the sleep time to adjust the monitoring interval
done