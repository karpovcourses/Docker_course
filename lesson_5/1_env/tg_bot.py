import logging
import os

import pandas as pd
from aiogram import Bot, Dispatcher, executor, types

logging.basicConfig(
    format="%(levelname)s: %(asctime)s - %(message)s",
    datefmt="%d-%b-%y %H:%M:%S",
    level=logging.INFO,
)

# ============ !!! Секретный токен !!! ===============
APP_TOKEN = os.environ.get("APP_TOKEN")
# ====================================================
PATH_TO_TODO_TABLE = "todo_result/todo_list.csv"

bot = Bot(token=APP_TOKEN)
dp = Dispatcher(bot)


def get_todo_data():
    # ============== Берем ==============
    return pd.read_csv(PATH_TO_TODO_TABLE)
    # ===================================


@dp.message_handler(commands="all")
async def all_tasks(payload: types.Message):
    await payload.reply(f"```{get_todo_data().to_markdown()}```", parse_mode="Markdown")


@dp.message_handler(commands="add")
async def add_task(payload: types.Message):
    text = payload.get_args().strip()
    new_task = pd.DataFrame({"text": [text], "status": ["active"]})
    updated_tasks = pd.concat([get_todo_data(), new_task], ignore_index=True, axis=0)

    # ============ Сохраняем ============
    updated_tasks.to_csv(PATH_TO_TODO_TABLE, index=False)
    # ===================================

    logging.info(f"Добавил в таблицу задачу - {text}")
    await payload.reply(f"Добавил задачу: *{text}*", parse_mode="Markdown")


@dp.message_handler(commands="done")
async def complete_task(payload: types.Message):
    text = payload.get_args().strip()
    df = get_todo_data()
    df.loc[df.text == text, "status"] = "complete"

    # ============ Сохраняем ============
    df.to_csv(PATH_TO_TODO_TABLE, index=False)
    # ===================================

    logging.info(f"Выполнил задачу - {text}")
    await payload.reply(f"Выполнено: *{text}*", parse_mode="Markdown")


if __name__ == "__main__":
    executor.start_polling(dp)
