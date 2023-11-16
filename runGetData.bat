@echo off

REM Check if ST-monitor-getData is running
tasklist /FI "WINDOWTITLE eq ST-monitor-getData*" | find "cmd.exe" > nul
if errorlevel 1 (
    start "ST-monitor-getData" cmd /k "node .\data_service\getData.js"
)