#!/bin/bash
# Copy Vite manifest to Laravel expected location
if [ -f "public/build/.vite/manifest.json" ]; then
    cp "public/build/.vite/manifest.json" "public/build/manifest.json"
    echo "Manifest copied successfully"
else
    echo "Manifest not found"
fi
