from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app)

@app.route("/connect-db", methods=["POST"])
def connect_db():
    try:
        # Get credentials from the frontend request
        data = request.json
        server_address = data.get("serverAddress")
        port = int(data.get("port"))
        database = data.get("database")
        username = data.get("username")
        password = data.get("password")

        # Connect to the database
        conn = pymysql.connect(
            host=server_address,
            port=port,
            user=username,
            password=password,
            database=database
        )
        conn.close()
        return jsonify({"message": "Connection successful!"}), 200
    except Exception as e:
        return jsonify({"message": f"Failed to connect: {str(e)}"}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
