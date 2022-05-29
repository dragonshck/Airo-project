FROM python:3.10.2

WORKDIR /app

COPY requirement.txt requirement.txt
RUN pip3 install -r requirement.txt

COPY . ./

ENV FLASK_APP = main

CMD ["python3", "-m" , "flask", "run", "--host=0.0.0.0"]