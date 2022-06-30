#Installations

npm init

-- Global Installations

    npm i -g nodemon (automatically restarting the node application when file changes)

-- Local Installations

    npm i express (minimal and flexible Node.js web application framework)

    npm i morgan (logging middleware)

    npm i dotenv (loads environment variables)

    npm i mongoose (elegant mongodb object modeling for node.js)

    npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev (eslint & prettier config)

    npm i pug

    npm i crypto

    npm i bcrypt

    npm i validator

    npm i jsonwebtoken (sign authentication tokens)

    npm i express-rate-limit (library to prevent brute force attacks)

    npm i helmet (security headers)

    npm i express-mongo-sanitize (Data Sanitization against NoSQL query injection)

    npm i xss-clean (Data Sanitization against XSS)

    npm i date-fns (get endOfDay & startOfDay methods)

#Create a local MongoDB

-- Install MongoDB Community Edition

    brew install mongodb-community@5.0 (used homebrew)

    Run MongoDB Community Edition

    brew services start mongodb-community@5.0

    brew services stop mongodb-community@5.0

    Verify MongoDB Community Edition is running

    brew services list

-- Connect and Use MongoDB

    mongosh

    Select or create a new local MongoDB

    use "db name" (open or create a new database)
