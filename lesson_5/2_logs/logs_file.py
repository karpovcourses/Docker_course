import logging
from random import randint
from time import sleep


def main():
    logging.basicConfig(level=logging.INFO, filename="logs.txt")
    while True:
        value = randint(-2, 2)

        try:
            sleep(value)
        except ValueError as e:
            logging.error(e)
            continue

        logging.info(f"Random value = {value}")


if __name__ == "__main__":
    main()
