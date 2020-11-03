#!/bin/bash

cd josecarlosme-blog/
hugo --minify

cd ..

sudo docker build -t josecarlosme/josecarlos.me . --no-cache
sudo docker push josecarlosme/josecarlos.me
