from flask import Flask, jsonify, request, make_response
# from flask_cors import CORS
import psycopg2
import uuid
import os

app = Flask(__name__)
# cors = CORS(app, resources={"/": {"origins": "*"}})


def get_db_connection():
    conn = psycopg2.connect(
        # host="localhost",
        # port="5432",
        # database="docker_app_db",
        # user="docker_app",
        # password="docker_app",
        host=os.environ.get("HOST"),
        port=os.environ.get("PORT"),
        database=os.environ.get("DB"),
        user=os.environ.get("DB_USERNAME"),
        password=os.environ.get("DB_PASSWORD")
    )
    return conn


@app.route("/test", methods=["GET"])
def testing():
    return make_response(jsonify({"Test": "OK"}), 200)


@app.route("/api", methods=["GET"])
def get_record():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT id, text, status FROM app_table;")
        sql_data = cur.fetchall()
        cur.close()
        conn.close()
    except psycopg2.DatabaseError as e:
        return f"{e}", 500

    todo_data = []
    for data in sql_data:
        id_, text, status = data
        todo_data.append({"id": id_, "text": text, "status": status})

    res = make_response(jsonify(todo_data), 200)
    return res


@app.route("/api", methods=["PUT"])
def save_record():
    data = request.get_json()
    task_id = str(uuid.uuid4())

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO app_table (id, text, status) VALUES (%s, %s, %s)",
            (task_id, data["text"], data["status"])
        )
        conn.commit()
        cur.close()
        conn.close()
    except psycopg2.DatabaseError as e:
        return f"{e}", 500

    res = make_response(jsonify({"id": task_id}), 201)
    return res


@app.route("/api", methods=["POST"])
def update_record():
    data = request.get_json()

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            """
            UPDATE app_table 
            SET status = %s 
            WHERE id = %s
            """,
            (data["status"], data["id"])
        )
        conn.commit()
        cur.close()
        conn.close()
    except psycopg2.DatabaseError as e:
        return f"{e}", 500

    return "Task was updated ", 204


@app.route("/api", methods=["DELETE"])
def delete_record():
    data = request.get_json()

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("DELETE FROM app_table WHERE id = %s", (data["id"],))
        conn.commit()
        cur.close()
        conn.close()
    except psycopg2.DatabaseError as e:
        return f"{e}", 500

    return "Task was deleted ", 204
