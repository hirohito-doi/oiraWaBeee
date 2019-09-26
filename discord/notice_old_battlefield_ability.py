import requests
import json
import pickle
import os
import configparser
import datetime

PICKLED_FILE = "/data/dateSelects"
ABS_DIR = os.path.dirname(os.path.abspath(__file__))

ini = configparser.ConfigParser()
ini.read(os.path.join(ABS_DIR, './config.ini'), 'UTF-8')
WEBHOOK_URL = ini['DEFAULT']['webhook_url']


def post_on_discord(message):
    """Discordへメッセージを投稿する。"""
    # ヘッダー情報 とりあえずコピペ
    headers = {
        'User-Agent': 'discord-simple-webhook (0.0.1)',
        'Content-Type': 'application/json'
    }

    data = json.dumps({'content': message})
    response = requests.post(WEBHOOK_URL, headers=headers, data=data)

    if response.status_code == 204:
        return True
    else:
        # 投稿に失敗した場合は例外を投げる
        raise Exception("Error on post : " + str(response.status_code))


def get_date_selects():
    """古戦場日程データを取得する"""
    try:
        with open(PICKLED_FILE, 'rb') as f:
            date_selects = pickle.load(f)
    except Exception:
        date_selects = []

    return date_selects


def run_notice():
    date_selects = get_date_selects()

    for date_select in date_selects:
        date_formatted = datetime.datetime.strptime(date_select, '%Y-%m-%d')
        date_formatted = date_formatted.date()
        print(date_formatted)
        if(date_formatted == datetime.date.today()):
            post_on_discord('団アビ使ったか？')


if __name__ == '__main__':
    run_notice()
