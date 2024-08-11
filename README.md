
# Cents: The Expense Tracker

**Cents** is a comprehensive expense tracking application designed to help users manage their finances effortlessly. With features like income and expense tracking and intuitive charts, Cents provides a complete solution for personal financial management.

## Features

- **Track Expenses and Incomes**: Easily log and categorize your expenses and incomes.
- **Visualize Data**: Use interactive charts to visualize your financial data over different periods.
- **Export Data**: Export your financial data for external analysis.
- **Responsive Design**: Fully responsive UI that works on both desktop and mobile devices.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS  
    <img src="https://github.com/devicons/devicon/blob/master/icons/nextjs/nextjs-original.svg" title="Next.js" alt="Next.js" width="20" height="20"/>&nbsp;
    <img src="https://github.com/devicons/devicon/blob/master/icons/tailwindcss/tailwindcss-original.svg" title="Tailwind" alt="Tailwind" width="20" height="20"/>
- **Backend**: Node.js with Express, Supabase  
    <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original.svg" title="NodeJS" alt="NodeJS" width="20" height="20"/>&nbsp;
    <img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original.svg" title="Express" alt="Express" width="20" height="20"/>&nbsp;
    <img src="https://github.com/devicons/devicon/blob/master/icons/supabase/supabase-original.svg" title="Supabase" alt="Supabase" width="20" height="20"/>
- **Database**: Supabase (PostgreSQL)  
    <img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original.svg" title="PostgreSQL" alt="PostgreSQL" width="20" height="20"/>
- **Deployment**: Render  
    <img src="https://github.com/user-attachments/assets/58b528b3-6c0b-47d0-8c69-3818dafa636c" title="Render" alt="Render" width="20" height="20"/>

## Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rizxn00/Cents.git
   ```

2. **Configure Backend**

   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the backend directory and add the following:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SECRET_KEY=your_secret_key
   PORT=8000
   ORIGIN=http://localhost:3000
   ```
   Run the backend:
   ```bash
   npm run dev
   ```

3. **Configure Frontend**

   ```bash
   cd frontend
   npm install
   ```
   Create a `.env` file in the frontend directory and add the following:
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   ```
   Run the frontend:
   ```bash
   npm run dev
   ```

## Screen Shots
![dashboard](https://github.com/user-attachments/assets/596d1843-d89d-4829-b8dd-8864450f7045)
![charts](https://github.com/user-attachments/assets/d8d5f297-ab7d-4342-853d-0f8105e5f7d8)
![expense](https://github.com/user-attachments/assets/627c9afc-5bf4-41e2-b313-6a974894dfc3)
![income](https://github.com/user-attachments/assets/3e1bb817-5214-4b7a-8562-338347fb838f)
![settings](https://github.com/user-attachments/assets/86a33394-e1b2-4de4-96f0-dd019e7ca250)
![categories](https://github.com/user-attachments/assets/58ab06e6-5760-4994-ae8c-efde0e27973a)


