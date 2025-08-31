@echo off
REM Copy Vite manifest to Laravel expected location
if exist "public\build\.vite\manifest.json" (
    copy "public\build\.vite\manifest.json" "public\build\manifest.json" >nul 2>&1
    echo Manifest copied successfully
) else (
    echo Manifest not found
)
