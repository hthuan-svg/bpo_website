@REM Runs the site's content checks using the Node.js installation on this computer.
@echo off
cd /d "%~dp0"
node tools\validate-content.mjs
if errorlevel 1 (
  echo.
  echo Content validation found errors. Follow the instructions above, then run this file again.
  pause
  exit /b 1
)
echo.
echo Content validation completed successfully.
pause
