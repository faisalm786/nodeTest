# run npm install "npm i"
# run "npm install typescript -g"
# run "tsc"
# create .env in dist folder

The contents of .env should be as follows:
DB_USER=mac
DB_HOST=localhost
DB_DATABASE=mac
DB_PASSWORD=password
DB_PORT=5433

change the parameters accordingly. Make sure postgres is setup on your system.

# cd ./dist
# run "node app.js"