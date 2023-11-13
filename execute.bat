@echo off

REM Check if ST-monitor-server is running
tasklist /FI "WINDOWTITLE eq ST-monitor-server*" | find "cmd.exe" > nul
if errorlevel 1 (
    start "ST-monitor-server" cmd /k "node .\data_service\server.js"
)

REM Check if ST-monitor-ui is running
tasklist /FI "WINDOWTITLE eq ST-monitor-ui*" | find "cmd.exe" > nul
if errorlevel 1 (
    start "ST-monitor-ui" cmd /k "npm start"
)

REM Check if ST-monitor-getData is running
tasklist /FI "WINDOWTITLE eq ST-monitor-getData*" | find "cmd.exe" > nul
if errorlevel 1 (
    start "ST-monitor-getData" cmd /k "node .\data_service\getData.js"
)
 