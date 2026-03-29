@echo off
cd /d "%~dp0"
echo.
echo Developer Portfolio Main - Vikrant Sharma
echo Installing dependencies if needed...
call npm install
echo.
echo Starting dev server. KEEP THIS WINDOW OPEN.
echo Open the URL shown below in your browser (e.g. http://localhost:5173).
echo.
call npm run dev
pause
