@echo off
title AiMapping - Vista de Produccion
echo ========================================================
echo   Iniciando servidor de produccion AiMapping
echo ========================================================
echo.
node preview-server.cjs
if %ERRORLEVEL% NEQ 0 (
  echo Probando con vite preview...
  npx vite preview --port 4173 --open
)
pause
