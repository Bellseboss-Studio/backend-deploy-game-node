# backend-deploy-game-node
Back-end server to deploy games, and get email to game

## Issue: `node_modules` not found into docker

Please install packages `npm install` before start app. This command execute into container, because the node_module from win, will be incompatible into linux container


migrate database:
`npx knex migrate:latest`

create migration
`npx knex migrate:make migration_name`

