# Use the official Playwright image with browsers pre-installed
FROM mcr.microsoft.com/playwright:v1.44.0-focal

# Install Java 17 for Allure reports
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk wget && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Allure CLI
RUN wget -O allure-commandline.tgz https://github.com/allure-framework/allure2/releases/download/2.24.0/allure-2.24.0.tgz && \
    tar -zxf allure-commandline.tgz && \
    mv allure-2.24.0 /opt/allure && \
    ln -s /opt/allure/bin/allure /usr/local/bin/allure && \
    rm allure-commandline.tgz

# Set environment variables
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH"
ENV TEST_ENV=qa

# Set working directory
WORKDIR /app

# Copy package files first (for better Docker layer caching)
COPY package.json package-lock.json ./

# Install Node.js dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Create output directories
RUN mkdir -p output/qa output/dev output/production

# Verify installations
RUN echo "Verifying installations..." && \
    node --version && \
    java --version && \
    allure --version && \
    npx playwright --version

# Default command - can be overridden
CMD ["npm", "run", "test:qa:smoke"]

# For QA smoke tests (default)
# CMD ["npm", "run", "test:qa:smoke"]

# For development tests
# CMD ["npm", "run", "test:dev:smoke"]

# For production tests
# CMD ["npm", "run", "test:prod:smoke"]

# For all QA tests
# CMD ["npm", "run", "test:qa"]

# For interactive shell (debugging)
# CMD ["bash"]