@echo off

REM Check if ST-monitor-ui is running
tasklist /FI "WINDOWTITLE eq ST-monitor-ui*" | find "cmd.exe" > nul
if errorlevel 1 (
    start "ST-monitor-ui" cmd /k "npm start"
)