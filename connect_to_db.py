import mysql.connector

# Connection details
HOST = "127.0.0.1"
PORT = 9210
USER = "root"
PASSWORD = "ZSE$rfvCXD"
DATABASE = "merger_database"  # Replace with your actual database name

def connect_and_show_tables():
    try:
        print(f"Attempting to connect to MySQL at {HOST}:{PORT} with user '{USER}'")
        connection = mysql.connector.connect(
            host=HOST,
            port=PORT,
            user=USER,
            password=PASSWORD,
            database=DATABASE
        )
        if connection.is_connected():
            print("Connection successful!")
            cursor = connection.cursor()
            cursor.execute("SHOW TABLES")
            tables = cursor.fetchall()
            print("Tables in the database:")
            for table in tables:
                print(f"- {table[0]}")
        else:
            print("Connection failed.")
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("Connection closed.")

if __name__ == "__main__":
    connect_and_show_tables()
