from random import randint
from sys import stderr
from time import sleep


def main():
    while True:
        value = randint(-2, 2)

        try:
            sleep(value)
        except ValueError as e:
            print(e, file=stderr)
            continue

        print(f"Random value = {value}")  # STDOUT


if __name__ == "__main__":
    main()
