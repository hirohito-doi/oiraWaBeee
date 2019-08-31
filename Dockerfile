FROM ubuntu:latest

RUN apt-get update

RUN apt-get install -y vim less python3 python3-pip

RUN pip3 install --upgrade pip
RUN pip3 install --upgrade setuptools
RUN pip3 install requests beautifulsoup4

COPY ./guraburu_news_delivery.py /var/docker_dir/guraburu_news_delivery.py

# 初期データを作成するために実行
RUN python3 /var/docker_dir/guraburu_news_delivery.py -r

# crontで定期実行
RUN apt-get install -y cron
RUN echo '*/5 * * * * root python3 /var/docker_dir/guraburu_news_delivery.py' >> /etc/crontab
CMD ["cron", "-f"]