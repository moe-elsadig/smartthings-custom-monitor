@echo off
taskkill /FI "WINDOWTITLE eq ST-monitor-server*" /F
taskkill /FI "WINDOWTITLE eq ST-monitor-ui*" /F