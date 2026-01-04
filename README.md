# Library Book Management System

## 📌 Project Description
The Library Book Management System is a backend application developed using Node.js, Express.js, and MongoDB.
It provides RESTful APIs to manage library books efficiently using CRUD operations.

## 🎯 Objectives
- Connect Node.js with MongoDB
- Design schema using Mongoose
- Implement CRUD operations
- Apply conditions and validations
- Verify data using Postman and MongoDB tools

## 🛠 Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose

## 🔧 Tools Used
- VS Code
- Postman
- MongoDB Compass
- MongoDB Shell (mongosh)

## 📂 API Endpoints

### Create Book(s)
POST /books


### Get All Books


GET /books


### Get Books by Category


GET /books/category/:category


### Get Books After Year


GET /books/after/:year


### Update Copies


PUT /books/copies/:id


### Update Category


PUT /books/category/:id


### Delete Book (only if copies = 0)


DELETE /books/:id


## ✅ Features
- Full CRUD operations
- Category-based filtering
- Conditional delete logic
- Negative stock prevention
- Error handling

## 📌 Internship
Naan Mudhalvan Internship – Day 4 Task

## 👤 Developed By
Kondragunta Naveen
