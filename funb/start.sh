#!/bin/sh

node ace make:migration users

node ace make:migration workspaces

node ace make:migration kanbans

node ace make:migration tasks

node ace make:migration missions

node ace migration:run

node ./build/bin/server.js
