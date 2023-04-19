import logging
import os

from clickhouse_driver import Client
import pandas as pd
from aiogram import Bot, Dispatcher, executor, types

logging.basicConfig(
    format="%(levelname)s: %(asctime)s - %(message)s",
    datefmt="%d-%b-%y %H:%M:%S",
    level=logging.INFO,
)

# ============ !!!!! ===============
APP_TOKEN = os.environ.get("APP_TOKEN")
# ==================================

bot = Bot(token=APP_TOKEN)
dp = Dispatcher(bot)

connection = Client(
    host="localhost",  # <-- Проблема вот тут
    user="default",
    password="",
    port=9000,
    database="todo",
)


@dp.message_handler(commands="all")
async def all_tasks(payload: types.Message):
    ch_all_data = connection.execute("SELECT * FROM todo.todo")

    await payload.reply(
        f"```{pd.DataFrame(ch_all_data, columns=['id', 'text', 'status']).drop('id', axis=1).to_markdown()}```",
        parse_mode="Markdown"
    )


@dp.message_handler(commands="add")
async def add_task(payload: types.Message):
    text = payload.get_args().strip()

    connection.execute(
        "INSERT INTO todo.todo (id, text, status) VALUES (generateUUIDv4(), %(text)s, 'active')",
        {"text": text}
    )

    logging.info(f"Добавил в таблицу задачу - {text}")
    await payload.reply(f"Добавил задачу: *{text}*", parse_mode="Markdown")


@dp.message_handler(commands="done")
async def complete_task(payload: types.Message):
    text = payload.get_args().strip()

    connection.execute(
        "ALTER TABLE todo.todo UPDATE status = 'complete' WHERE text = %(text)s",
        {"text": text}
    )

    logging.info(f"Выполнил задачу - {text}")
    await payload.reply(f"Выполнено: *{text}*", parse_mode="Markdown")


if __name__ == "__main__":
    executor.start_polling(dp)
