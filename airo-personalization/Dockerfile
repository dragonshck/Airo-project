FROM python:3.10.2

ENV PORT 8080
ENV HOST 0.0.0.0

EXPOSE 8080

RUN apt-get update -y && \
    apt-get install -y python3-pip

COPY requirements.txt requirement.txt
RUN pip3 install -r requirement.txt

WORKDIR /app

COPY . /app

ENTRYPOINT [ "python3" ]

CMD [ "app.py" ]