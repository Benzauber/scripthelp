# Stage 1: Build React App
FROM node:16 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY react-app/package.json react-app/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the React app source code
COPY react-app/ ./

# Build the React app
RUN npm run build

# Stage 2: Set up Flask app
FROM python:3.9-slim

WORKDIR /app

# Install Flask and other dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy Flask app source code
COPY flask/ ./
COPY instance/ ./instance

# Copy the built React app from the previous stage
COPY --from=build /app/build ./static

# Expose the Flask port
EXPOSE 5000

# Set environment variables (if needed)
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# Run the Flask app
CMD ["flask", "run", "--host=0.0.0.0"]
