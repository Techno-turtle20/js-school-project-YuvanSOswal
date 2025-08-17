# Timeline App - JS School Project

An interactive historical timeline application. This project allows users to explore major milestones across various topics like Technology, Science, Art, History, Space, and Medicine. It features a responsive design, theme toggling, and a modal for detailed event information.
The application is built using HTML, CSS, and TypeScript. It follows a modular structure to ensure maintainability and scalability.

# Getting Started

Follow these steps to set up and run the project on your local machine.

# Prerequisites

To run this project, you need to have Node.js and npm (Node Package Manager) installed on your system. If you don't have them, you can download the latest version from [nodejs.org](https://nodejs.org/).

# Installation

Since the `node_modules` folder is typically very large and should not be committed to Git, you need to install the project's dependencies locally. The required packages (like TypeScript and `serve`) are listed in the `package.json` file.

1.  Clone the repository (if you haven't already):

    ```bash
    git clone [https://github.com/Techno-turtle20/js-school-project-YuvanSOswal.git](https://github.com/Techno-turtle20/js-school-project-YuvanSOswal.git)
    ```

2.  Navigate into the project directory:

    ```bash
    cd js-school-project-YuvanSOswal
    ```

3.  Install the dependencies:
    Open your terminal or command prompt in the project's root directory (`js-school-project-YuvanSOswal/`) and run:

    ```bash
    npm install
    ```

    This command reads your `package.json` file and downloads all the necessary libraries and tools (including TypeScript compiler) into a `node_modules` folder within your project.

# Running the Application

The project uses TypeScript, which needs to be compiled into JavaScript before running in the browser. A local web server is then used to serve the files.

1.  Compile the TypeScript code:
    After installing dependencies, you need to compile the `.ts` files into `.js` files. Run the following command in your terminal:

    ```bash
    npm run build
    ```

    This command performs the following actions:
    * It first removes the existing `dist` folder to ensure a clean build.
    * Then, it compiles all the TypeScript files from the `src/` directory into JavaScript, placing the compiled output into a new `dist/` folder. This process is configured by `tsconfig.json`.

2.  Start the local development server:
    Once the build is complete, you can start the web server to view the application. Run:

    ```bash
    npm start
    ```

    This command will:
    * Execute the `npm run build` command automatically if the project hasn't been built or if changes have been made.
    * Start a lightweight local web server. You will typically see a message indicating that the server is running, usually at `http://localhost:3000`.

3.  Open in your browser:
    Open your web browser and navigate to the address provided by the terminal (most commonly `http://localhost:3000`) to see the **Interactive Timeline** application running.

# Project Structure

The project maintains a clear and modular file structure, making it easy to navigate and understand:
.
├── dist/                   
│   ├── services/
│   │   ├── dataFetcher.js 
│   │   └── dataFetcher.js.map
│   ├── ui/
│   │   ├── modalHandler.js     
│   │   ├── modalHandler.js.map
│   │   ├── scrollHandler.js    
│   │   ├── scrollHandler.js.map
│   │   ├── themeSwitcher.js    
│   │   ├── themeSwitcher.js.map
│   │   ├── timelineRenderer.js 
│   │   └── timelineRenderer.js.map
│   └── utils/
│       ├── dom.js            
│       ├── dom.js.map
│       ├── index.js       
│       ├── index.js.map
│       └── types.js            
├── src/                   
│   ├── services/
│   │   └── dataFetcher.ts      
│   ├── ui/
│   │   ├── modalHandler.ts     
│   │   ├── scrollHandler.ts   
│   │   ├── themeSwitcher.ts    
│   │   └── timelineRenderer.ts 
│   └── utils/
│       ├── dom.ts             
│       ├── index.ts           
│       └── types.ts           
├── index.html             
├── package.json           
├── package-lock.json   
├── styles.css              
├── timeline.json          
└── tsconfig.json          

# Author
Yuvan SOswal - DataArt JS School Project
