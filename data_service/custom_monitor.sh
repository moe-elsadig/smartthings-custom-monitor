#!/bin/bash

while true; do
  device_status=$(smartthings devices:status a2df25e2-7fee-7ca9-70f0-2ba4f3bc7fbb -j)

  echo "$device_status" > sample_output.json

  echo "Current AC status: $device_status"
  sleep 10 # Change the sleep time to adjust the monitoring interval
done