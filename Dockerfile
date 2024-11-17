# Use Python slim as the base image
FROM python:3.10-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    default-mysql-client && \
    rm -rf /var/lib/apt/lists/*

# Install Cloudflared
RUN curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared && \
    chmod +x /usr/local/bin/cloudflared

# Set working directory
WORKDIR /app

# Copy the database connection script
COPY connect_to_db.py .

# Install Python dependencies
RUN pip install mysql-connector-python

# Start the Cloudflared tunnel and run the Python script
CMD ["sh", "-c", "cloudflared access tcp --hostname mysql.emerginary.com --url 127.0.0.1:9210 & sleep 5 && python connect_to_db.py && tail -f /dev/null"]
