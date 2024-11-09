# Use Python 3.11 image
FROM python:3.11

# Install system dependencies
RUN apt-get update && apt-get install -y \
    cmake \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose port
EXPOSE 8000

# Start Daphne server
CMD ["daphne", "core.asgi:application", "-b", "0.0.0.0", "-p", "8000"]