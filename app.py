from flask import Flask, render_template, request
import mysql.connector
import random

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    data = []
    if request.method == "POST":
        host = request.form["host"]
        port = request.form["port"]
        user = request.form["user"]
        password = request.form["password"]
        database = request.form["database"]

        try:
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
            data.append({"error": f"Error: {err}"})
        finally:
            if "connection" in locals() and connection.is_connected():
                connection.close()

    return render_template("index.html", data=data)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
