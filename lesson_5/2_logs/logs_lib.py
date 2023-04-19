import logging
from random import randint
from time import sleep

logging.basicConfig(
    format="%(levelname)s: %(asctime)s - %(message)s",
    datefmt="%d-%b-%y %H:%M:%S",
    level=logging.INFO,
)


def main():
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
