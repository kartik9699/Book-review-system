# Book-review-system
building a full stack book review system in MERN STACK
SETUP
1.backend
  1.npm install express cors express-validator multer dotenv jsonwebtoken mongoose nodemon bcryptjs
  2.create database in mongodb
  3.add your mongoURI in .env file
  4.run command 'nodemon index.js'
2.frontend
  1.run command npm create vite@latest frontend
  2.npm install react-router-dom react-icons 
  3.run command 'npm run dev'
3.database
  1.user
    id
    name
    mobile_no
    email
    password

  2.book
    id
    name
    author
    publisher
    genre

  3.review
    id
    bookid (ref by book)
    userid (ref by user)
    comment
    rating
    
  
