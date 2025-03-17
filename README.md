# Backend Portfolio

This is a backend project developed with [NestJS](https://nestjs.com/) for sending emails from the contact form of a portfolio.

## Features

- Sending emails using [Nodemailer](https://nodemailer.com/).
- Input data validation with [class-validator](https://github.com/typestack/class-validator).
- API abuse protection with [@nestjs/throttler](https://github.com/nestjs/throttler).
- Environment variables configuration with [@nestjs/config](https://docs.nestjs.com/techniques/configuration).

## Requirements

- Node.js (version 14 or higher)
- npm (version 6 or higher)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/backend-portfolio.git
    cd backend-portfolio
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file based on the `.env.template` file and fill in the environment variables:

    ```sh
    cp .env.template .env
    ```

4. Configure the environment variables in the `.env` file:

    ```env
    EMAIL_USER="your gmail account"
    EMAIL_PASSWORD="your application password"
    PORT=3000
    ```

## Usage

To start the server in development mode:

```sh
npm run start:dev