from clickhouse_driver import Client

connection = Client(
    host="localhost",
    user="default",
    password="",
    port=9000,
)

connection.execute("CREATE DATABASE todo")
connection.execute("""CREATE TABLE todo.todo (
    id UUID,
    text String,
    status String
) engine = MergeTree() order by id""")
