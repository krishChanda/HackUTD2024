from flask import Flask, render_template, request, make_response
import mysql.connector
import random

app = Flask(__name__)

@app.after_request
def add_no_cache_headers(response):
    """Add headers to prevent caching."""
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "-1"
    return response

@app.route("/", methods=["GET", "POST"])
def index():
    # Clear data at the start of every request
    data = []
    error_message = None

    if request.method == "POST":
        # Collect form inputs
        host = request.form["host"]
        port = request.form["port"]
        user = request.form["user"]
        password = request.form["password"]
        database = request.form["database"]

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
                cursor = connection.cursor()

                # Fetch all table names
                cursor.execute("SHOW TABLES")
                tables = cursor.fetchall()

                for table in tables:
                    table_name = table[0]

                    # Get the number of rows in the table
                    cursor.execute(f"SELECT COUNT(*) FROM `{table_name}`")
                    total_rows = cursor.fetchone()[0]

                    # Fetch up to 50 random records
                    if total_rows > 0:
                        offset = max(0, random.randint(0, total_rows - 50))
                        cursor.execute(f"SELECT * FROM `{table_name}` LIMIT 50 OFFSET {offset}")
                        rows = cursor.fetchall()
                        data.append({"table_name": table_name, "records": rows})
                    else:
                        data.append({"table_name": table_name, "records": ["Table is empty."]})

                cursor.close()
        except mysql.connector.Error as err:
            error_message = f"Error: {err}"
        finally:
            if "connection" in locals() and connection.is_connected():
                connection.close()

    return render_template("index.html", data=data, error_message=error_message)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
