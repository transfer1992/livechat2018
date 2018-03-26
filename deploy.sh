#!/bin/bash

cd frontend-shop/
npm run build
rm -rf ../backend/shop/ && mv build/ ../backend/shop/
cd ../frontend-operator/
npm run build
rm -rf ../backend/oppanel/ && mv build/ ../backend/oppanel/
cd ../backend/
node server.js &
google-chrome http://localhost:4000/oppanel/ &
google-chrome http://localhost:4000/shop/ &
