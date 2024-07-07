# myFlix-client

## Project Overview

The **myFlix** project is a single-page, responsive application built using React, designed for movie enthusiasts who want to explore and save information about various movies.  This client-side application interfaces with an existing server-side REST API and database, forming a complete full-stack JavaScript project utilizing the MERN stack (MongoDB, Express, React, and Node.js).

## Table of Contents

- [Project Overview] (#project-overview)
- [Features](#features)
- [User Stories](#user-stories)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Features

### Views & Features

- **Main View:**
    - Returns all movies to the user (each movie item with an image, title, and genre).
    - Ability to select a movie for more details.
    - Ability to log out.
    - Ability to navigate to Profile View.
    - Allows users to add or remove a movie from their list of favorites.

- **Movie View:**
    - Returns data (image, title, description, genre, director, cast) about a single movie to the user.
    - Allows users to add or remove a movie from their list of favorites.

- **Login View:**
    - Allows users to log in with a username and password.

- **Signup View:**
    - Allows new users to register (username, password, email).

- **Profile View:**
    - Displays user registration details.
    - Allows users to update their info (username, password, email, date of birth).
    - Displays favorite movies.
    - Allows users to remove a movie from their list of favorites.
    - Allows existing users to deregister.

## User Stories


- **As a user**, I want to access information about movies so I can learn more about movies I’ve watched or am interested in.
- **As a user**, I want to create a profile so I can save data about my favorite movies.

## Setup and Installation

Follow these steps to get myFlix up and running on your local machine:

1.  install parcel globally
    ```sh
    npm install -g parcel
    ```
2.  install React and React Doc
    ```sh
    npm install --save react react-dom
    ```
3.  run application
    ```sh
    parcel src/index.html
    ```

## Usage

1. Open your browser and navigate to `http://localhost:1234` to use the app locally.
2. Create an account or log in with existing credentials.
3. Browse through the list of movies, search for specific titles, and view detailed information.
4. Add movies to your list of favorites, and manage your profile information.

## Deployment

myFlix app is deployed on Netlify and can be accessed [here](https://myflix-2024.netlify.app/)

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the code style and include tests for new features.