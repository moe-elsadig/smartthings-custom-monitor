@echo off

REM Check if ST-monitor-cleanup is running
tasklist /FI "WINDOWTITLE eq ST-monitor-cleanup*" | find "cmd.exe" > nul
if errorlevel 1 (
    start "ST-monitor-cleanup" cmd /k "node .\data_service\cleanup.js"
)