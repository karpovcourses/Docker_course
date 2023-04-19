FROM python:3.8

WORKDIR /logs

COPY ./logs_console.py ./console

COPY ./logs_lib.py ./lib

COPY ./logs_file.py ./file

ENTRYPOINT ["python3", "-u"]