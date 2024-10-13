
<!--
README for Anan's Quran Project
This README file provides an overview of the project, setup instructions, and details on the libraries used.
End of comments.
-->

# Anan's Quran Project

## Project Overview

Anan's Quran project is a Next.js application designed for [purpose of the project]. This project incorporates a variety of React components and features built using modern libraries like Radix UI, Clerk for authentication, and Tailwind CSS for styling.

## Features

- Authentication using Clerk.
- Responsive UI with Tailwind CSS.
- UI components from Radix UI.
- Real-time updates with Socket.io.
- PDF rendering with react-pdf.
- Excel file handling with ExcelJS.
- Interactive motion effects using Framer Motion.

## Table of Contents

1. [Installation](#installation)
2. [Running the Project](#running-the-project)
3. [Libraries and Dependencies](#libraries-and-dependencies)
4. [Scripts](#scripts)
5. [DevDependencies](#devdependencies)
6. [License](#license)

## Installation

Before starting, ensure you have Node.js installed on your machine.

1. Clone the repository:

    ```bash
    git clonehttps://github.com/almasriprojects/AnanQuran.git
    cd anans-quran
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

## Running the Project

To start the development server, run the following command:

```bash
npm run dev
```

The application will start on [http://localhost:3000](http://localhost:3000).

To build the project for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Libraries and Dependencies

This project uses the following key libraries:

- **@clerk/nextjs**: Authentication library for Next.js (^4.31.5)
- **@radix-ui/react-* libraries**: Used for various UI components such as avatars, checkboxes, dialogs, dropdown menus, etc.
- **react-pdf**: For rendering PDF files in the app (^9.1.1).
- **socket.io & socket.io-client**: Real-time bidirectional communication.
- **tailwindcss**: Utility-first CSS framework.
- **framer-motion**: Animation library for React.

For a full list of libraries, refer to the `package.json` file.

## Scripts

These are the npm scripts available for use in this project:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run start`: Starts the project in production mode.
- `npm run lint`: Runs the linter to check for code quality.

## DevDependencies

- **Types for Node.js and React**: Ensures type safety for Node.js and React code.
- **ESLint**: Code linter for identifying and fixing issues in JavaScript code.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **TypeScript**: Type-safe JavaScript for enhanced development experience.

## License

This project is licensed under the MIT License.

<!-- End of README comments -->
