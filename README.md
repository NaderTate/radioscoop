![Logo](public/logo.png)

# Radio Scoop

## The official website for Radio Scoop.

![GitHub top language](https://img.shields.io/github/languages/top/nadertate/radioscoop)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fwww.radio-scoop.com&up_message=online&label=radio-scoop)

# Tech Used:

#### Next.JS 14 server actions, Prisma accelerate with MongoDB, NextUI, Tailwindcss, Shadcn, Next-Auth (Auth.js), and Typescript.

# Design Principles:

#### I followed the `SOLID` principles as much as possible.

# Folder Structure:

#### 2 route groups:

- (public) contains all the public routes.
- (protected) contais all the dashboard routes.

#### Components that are used in mulitple places are inside the components folder at the project root.

#### Components that are used in one place are in a `_components` folder is their route.

#### All forms have their own hooks responsible for managing the form states and submitting to the database.

#### actions folder contains all the server actions for creating / updating episodes, programs, features,etc...
