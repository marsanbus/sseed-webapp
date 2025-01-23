I'll help you with the requirements and steps to run this project locally on your personal computer.

Required Programs:

Node.js - Version 18.x or higher
Download from: https://nodejs.org/
Steps to Run:

Install Node.js

Download and install Node.js from the official website
Verify installation by opening a terminal/command prompt and running:

node --version
npm --version
Project Setup

Open a terminal/command prompt
Navigate to the project directory
Install dependencies:

npm install
Start Development Server

In the same terminal, run:

npm run dev
The development server will start and you'll see a URL (typically http://localhost:5173)
Open that URL in your web browser to view the application
Additional Notes:

Make sure you have a modern web browser installed (Chrome, Firefox, Safari, or Edge)
The project uses Vite as the development server, which provides fast hot module replacement (HMR)
All dependencies are managed through npm and will be installed automatically when you run npm install
No additional programs or global installations are required beyond Node.js
That's it! The project should now be running locally on your machine.

--------------------------------------------------------------------------------------

Installing nodejs (from wsl)

- sudo apt remove nodejs 

- curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -

- sudo apt install -y nodejs

In case of error:

- sudo apt remove libnode-dev 

- sudo apt clean

- sudo apt install -y nodejs

- node --version                                                                                                                marcos@

- npm --version 