FROM python:3.7

ENV PYTHONUNBUFFERED 1
COPY requirements.txt /opt/web/
RUN pip install --no-cache-dir -r /opt/web/requirements.txt

WORKDIR /var/source/web