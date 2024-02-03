# Next Crypto - Virtual Token Marketplace 🚀

Welcome to **Next Crypto**, a marketplace for virtual tokens where users can create, sell, and buy custom tokens. This project is built using TypeScript, Next.js, PostgresSQL database with Prisma, Stripe for payments, and Uploadthing for uploading custom token images.

## 🌐 Explore Online

Visit marketplace live [here](https://next-crypto-marketplace.vercel.app).

## 🚀 Technologies Used

- **TypeScript**: Superset of JavaScript that adds static types.
- **Next.js**: React framework for building server-side rendered and static web applications.
- **PostgresSQL**: Open-source relational database.
- **Prisma**: Database toolkit and ORM (Object-Relational Mapping) for Node.js and TypeScript.
- **Stripe**: Online payment processing for internet businesses.
- **Uploadthing**: Service for uploading custom token images.

## Installation 🛠️

1. **Clone this repository:**

    ```bash
    git clone [https://github.com/JarGad23/next-14-crypto-marketplace]
    ```

2. **Navigate to the project directory:**

    ```bash
    cd NextCrypto
    ```

3. **Install dependencies using npm or your preferred package manager:**

    ```bash
    npm install
    ```

4. **Set up environment variables by creating a `.env` file in the root of the project and add the following variables:**

    ```bash
    DATABASE_URL=
    NEXT_PUBLIC_SERVER_URL=
    UPLOADTHING_SECRET=
    UPLOADTHING_APP_ID=
    STRIPE_API_KEY=
    STRIPE_WEBHOOK_SECRET=
    ```

5. **Initialize Prisma and start the development server:**

    ```bash
    npx prisma db push
    npm run dev
    ```

6. **Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the development version.**

## Stripe Payments 💳

To test Stripe payments, use the following test card number: `4242 4242 4242 4242`.
Stripe is in test mode here so you can fill rest of your information with fake data.

## Features 🌟

- **Create Tokens**: Users can create their own virtual tokens.
- **Token Marketplace**: Tokens can be put up for sale, and users can buy other users' tokens.
- **Transaction History**: Users can view their transaction history.
- **Upload Custom Token Images**: Integration with Uploadthing allows users to upload custom images for their tokens.
- **Payment Integration**: Secure payments using Stripe for seamless transactions.
- **Dark/Light Mode**: Enjoy the marketplace in both dark and light modes.

Feel free to explore and contribute to **Next Crypto**! 🎉🚀
