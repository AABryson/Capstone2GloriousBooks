# Capstone Project Two: Glorious Books

## Description

This app provides several ways for users to search for a book on google books.  The app uses the Google Books API.  There were some things I was hoping to include such as reviews of books searched for, but later discovered the api, though claiming to have that ability, does not.  Users can also access their google bookshelves which store a list of their favorite books, books to read, etc.
I originally created a database to store user information for logging in and signing up, but as I worked on the oauth service for signing in to google to access a user's bookshelves, it became clear that the google authentication library handles all those things.  Users must have a google account to access the library section of the app.

### Objective

Create a database driven website powered by an external API.  

### Tools

Google Books API, React, NodeJS, OAuth2.0, Axios, Jest

### Features

Created a website for searching the Google Books API by either title, author, or subject.  Each book returned from a search was shown on a web page along with a summary of the book, book images, average rating, and links to purchase the book, preview the book, and add the book to Google bookshelves.  Users could login to the Google authorization server, receive a token, access their collection of books on the website, and update those collections.

### Link to Google Books API

<https://www.googleapis.com/books/v1>

## Technologies used

Frontend: Vite, React, Bootstrap, Vitest, Jest
Backend: Node.js, Express, OAuth2

## Deployment

The frontend can be found at <https://66a963f58ec79c039d90fc47--gentle-starship-ccb186.netlify.app>

## Prerequisites
Before you begin, be sure you have installed the following:
-Node.js (<https://nodejs.org/en/download/package-manager>)

## Installation

To install the project, follow these steps.

1. Clone the respository in a project directory.

    ```bash
    git clone https://github.com/AABryson/Capstone2GloriousBooks.git
    ```

2. Install the backend dependencies.
   Navigate to the backend folder

   ```bash
   cd backend
   npm install
   ```

3. Install the frontend dependencies.
   Navigate to the frontend folder

   ```bash
   cd ../frontend
   npm install
   ```

## Running the application

**Backend**
Open a new terminal and navigate to the backend folder.

```bash
node server.jsx
```

The backend listens on port 3001.

**Frontend**
Open a new terminal and navigate to the frontend folder.

```bash
npm run dev
```

The frontend runs on  <http://localhost:5173/>

## The home page

![homePage](https://i.imgur.com/1vuVs4s.jpeg)

## Github Link

<https://github.com/AABryson/Capstone2GloriousBooks.git>

## Contributions

Please feel free to contribute to this project.  Here is how.

1. **Fork the respository**
   Click the 'Fork' button at the top of this page to create your own copy of the repository.
2. **Clone your fork**

```bash
git clone https://github.com/'your username'/'forked-repo-name'.git
```

3. **Create a new branch** in the cloned repository

```bash
git checkout -b 'your-unique-branch-name'
```

4. After any changes have been made, in your project directory **add and commit your changes.**

```bash
git add .
git commit -m "'describe your changes'"
```

5. **Push changes** to remote repository

```bash
git push -u origin 'branch-name'
```

6. **Go to the original repository**
<https://github.com/AABryson/Capstone2GloriousBooks.git>

7. **Click on the 'Pull Requests" tab** near the top left of the page

8. **Click on the 'New Pull Request' button**
Select your branch and submit the Pull Request.


## Contact Information

anthonyalanbryson@gmail.com
