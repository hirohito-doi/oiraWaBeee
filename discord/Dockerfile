
# Alpine Linuxにpythonをインストールしたのイメージ
FROM python:3.7-alpine

COPY requirements.txt /opt/discord/
RUN pip install --no-cache-dir -r /opt/discord/requirements.txt

RUN apk update && \
    apk --no-cache add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata

RUN echo '0 20 * * * python /var/source/discord/notice_old_battlefield_ability.py' >> /var/spool/cron/crontabs/root
CMD crond -l 2 -f