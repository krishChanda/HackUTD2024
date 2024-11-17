import mysql.connector
import random

# Connection details
HOST = "127.0.0.1"
PORT = 9210
USER = "root"
PASSWORD = "ZSE$rfvCXD"
DATABASE = "merger_database"  # Replace with your actual database name

def connect_and_fetch_records():
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
            
            # Fetch all table names
            cursor.execute("SHOW TABLES")
            tables = cursor.fetchall()
            print("Tables in the database:")

            for table in tables:
                table_name = table[0]
                print(f"\nFetching up to 50 random records from table '{table_name}'...")
                
                # Get the number of rows in the table
                cursor.execute(f"SELECT COUNT(*) FROM `{table_name}`")
                total_rows = cursor.fetchone()[0]
                
                if total_rows == 0:
                    print(f"Table '{table_name}' is empty.")
                    continue
                
                # Generate random offsets to fetch up to 50 records
                offset = max(0, random.randint(0, total_rows - 50))
                query = f"SELECT * FROM `{table_name}` LIMIT 50 OFFSET {offset}"
                
                cursor.execute(query)
                rows = cursor.fetchall()
                print(f"Displaying {len(rows)} records from table '{table_name}':")
                
                # Print the records
                for row in rows:
                    print(row)
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
    connect_and_fetch_records()
