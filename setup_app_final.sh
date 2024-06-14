#!/bin/bash

# Script for Setting Up and Running a Full-Stack Notes App

# 1. Clone Repository
echo "Cloning repository..."
git clone https://github.com/SAcevedoArango/notes-app-final.git || { echo "Repository cloning failed!"; exit 1; }
cd notes-app-final

# 2. Install Node.js 18.x (If Not Already Installed)
NODE_VERSION=$(node -v)
if [[ "$NODE_VERSION" != "v18."* ]]; then
  echo "Installing Node.js 18.x..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Load NVM
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # Load Bash completion
  nvm install 18
  nvm use 18
else
  echo "Node.js 18.x is already installed."
fi

# 3. Install Frontend Dependencies (React)
echo "Installing frontend dependencies (React)..."
cd frontend && npm install react react-dom || { echo "Frontend dependency installation failed!"; exit 1; }

# 4. Install Backend Dependencies (Node.js, Express, Prisma)
echo "Installing backend dependencies (Node.js, Express, Prisma)..."
cd ../backend
npm install cors express prisma typescript ts-node @types/node --save-dev || { echo "Backend dependency installation failed!"; exit 1; }

# 5. Create and Populate .env File
echo "Creating and populating .env file in backend..."
cat > .env <<EOL
DATABASE_URL="postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=${DB_SSLMODE}"
EOL

# 6. Generate Prisma Client
echo "Generating Prisma Client..."
npx prisma db push --schema ./config/schema.prisma

# 7. Start Backend
echo "Starting backend server..."
node app.js & 

# 8. Start Frontend
echo "Starting frontend development server..."
cd ../frontend && npm start
