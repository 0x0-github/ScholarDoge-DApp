#!/bin/bash

cd ~/ScholarDoge-DApp/
git stash
git pull
chmod +x deply_server.sh
npm install && npm run build
sudo rm -r /var/www/html/scholar_doge_dapp/* && echo "[DEPLOYMENT] : Removed old version"
sudo cp -r ~/ScholarDoge-DApp/build/* /var/www/html/scholar_doge_dapp/ && echo "[DEPLOYMENT] : Added new version"
