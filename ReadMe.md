
# Run backend

git clone https://github.com/TomasCanevaro/PostBoardApp

cd server

npm i

-create .env file and add the following content (with your db credentials):

DATABASE_URL="postgresql://<username>:<password>@localhost:5432/postboard"

JWT_SECRET="supersecretjwtkey"

-have PostgreSQL installed

npx prisma migrate dev --name init

npx prisma generate => to generate prisma client (optional)

npm run dev