from flask import Flask, request, jsonify
import mysql.connector
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from the frontend

@app.after_request
def add_no_cache_headers(response):
    """Add headers to prevent caching."""
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "-1"
    return response

@app.route("/connect-database", methods=["POST"])
def connect_database():
    """
    Connect to the database and return table information.
    Endpoint: /connect-database
    Method: POST
    """
    data = []  # List to store table data
    error_message = None

    # Collect form inputs from the frontend
    request_data = request.get_json()
    host = request_data.get("host")
    port = request_data.get("port")
    user = request_data.get("user")
    password = request_data.get("password")
    database = request_data.get("database")

    app.logger.info("Received request to connect to database.")
    app.logger.info(f"Host: {host}, Port: {port}, User: {user}, Database: {database}")

    try:
        # Establish database connection
        connection = mysql.connector.connect(
            host=host,
            port=int(port),
            user=user,
            password=password,
            database=database
        )
        if connection.is_connected():
            app.logger.info(f"Successfully connected to the database: {database}")

            cursor = connection.cursor()

            # Fetch all table names
            cursor.execute("SHOW TABLES")
            tables = cursor.fetchall()

            if tables:
                for table in tables:
                    table_name = table[0]
                    data.append(table_name)  # Append table names to the response
                app.logger.info(f"Fetched tables: {data}")
            else:
                app.logger.warning("No tables found in the database.")

            cursor.close()
        else:
            error_message = "Failed to connect to the database."
            app.logger.error(error_message)
    except mysql.connector.Error as err:
        error_message = f"Database connection error: {err}"
        app.logger.error(error_message)
    except Exception as ex:
        error_message = f"Unexpected error: {ex}"
        app.logger.error(error_message)
    finally:
        if "connection" in locals() and connection.is_connected():
            connection.close()
            app.logger.info("Database connection closed.")

    # Return success or error response
    if error_message:
        return jsonify({"success": False, "error": error_message}), 400
    return jsonify({"success": True, "data": data}), 200

@app.route("/health", methods=["GET"])
def health_check():
    """
    Health check endpoint for the backend.
    Endpoint: /health
    Method: GET
    """
    return jsonify({"status": "ok", "message": "Backend is running."}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
