# My Notes App

This application is let users add, edit, delete and archive/unarchive notes. The design is responsive and provides a simple interface aimed at keeping it intuitive and easy to use.

## User Stories

### As a user, I want to be able to create, edit, and delete notes.
### As a user, I want to archive/unarchive notes.
### As a user, I want to list my active notes.
### As a user, I want to list my archived notes.

## Creation

This app was created using React Native for the frontend and Node.js, Express for the backend, with the Prisma ORM and PostgreSQL for database management.

## Dependencies

### Frontend
```javascript

Environment
  Node.js:
    Version: Node.js ^18.18.2 or later

Package Manager
  npm: (or equivalent package manager like yarn or pnpm)
    Version: (Usually included with Node.js installation)

Frontend Dependencies
  react: ^18.3.1
  react-dom: ^18.3.1
  react-scripts: 5.0.1
  @testing-library/jest-dom: ^5.17.0
  @testing-library/react: ^13.4.0
  @testing-library/user-event: ^13.5.0
  web-vitals: ^2.1.4

Type Definitions (TypeScript)
  @types/jest: ^27.5.2
  @types/node: ^16.18.98
  @types/react: ^18.3.3
  @types/react-dom: ^18.3.0

Development Tools
  TypeScript Compiler:
    Version: ^4.9.5 (or later)

```

### Backend
```javascript
Environment
  Node.js:
    Version: Node.js ^18.18.2 or later (recommended)

Package Manager
  npm: (or equivalent package manager like yarn or pnpm)
    Version: (Usually included with Node.js installation)

Backend Dependencies
  express: ^4.19.2
  cors: ^2.8.5
  @prisma/client: ^5.15.0

Database
  PostgreSQL: (Ensure you have a PostgreSQL database instance running and accessible)
    Prisma: ^5.15.0 (ORM for database interaction)

Development Tools
  TypeScript:
    Version: ^5.4.5 (or later)
  ts-node: ^10.9.2 (for running TypeScript files directly)
  nodemon: ^3.1.3 (for automatic server restarts during development)

Type Definitions (TypeScript)
  @types/cors: ^2.8.17
  @types/express: ^4.17.21
  @types/node: ^20.14.2

```

## Installation

Open Bash at the directory where the repository will be cloned and execute "setup_app_final.sh". The script should execute a series of instructions aimed at setting up the backend and frontend with just that command in any OS with Bash.

```sh
./setup_app_final.sh
```
### Usage

To manually start the backend using bash, navigate to the backend folder and enter:

```sh
node app.js
```

The backend API will be available at http://localhost:5000

To manually start the frontend using bash, navigate to the frontend folder and enter:

```sh
npm start
```

The frontend will be accessible at http://localhost:3000.


## Side Notes

Only Phase 1. Phase 2 was not implemented. No login information needed.
