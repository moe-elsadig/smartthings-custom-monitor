@echo off

REM Check if ST-monitor-server is running
tasklist /FI "WINDOWTITLE eq ST-monitor-server*" | find "cmd.exe" > nul
if errorlevel 1 (
    start "ST-monitor-server" cmd /k "node .\data_service\server.js"
)