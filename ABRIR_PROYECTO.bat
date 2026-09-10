@echo off
title AiMapping - Lanzador del Proyecto
echo ========================================================
echo   Iniciando AiMapping - Plataforma Web B2B
echo ========================================================
echo.
echo Abriendo en tu navegador predeterminado...
start http://127.0.0.1:5173
echo.
echo Si el servidor de desarrollo no estuviera activo, se iniciara a continuacion:
npm run dev
pause
