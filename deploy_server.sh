#!/bin/bash

cd ~/ScholarDoge-DApp/
git pull
npm run build
sudo rm -r /var/www/html/scholar_doge_dapp/*
sudo cp -r ~/ScholarDoge-DApp/build/* /var/www/html/scholar_doge_dapp/
