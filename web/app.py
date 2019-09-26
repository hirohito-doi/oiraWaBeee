import responder
import datetime, pickle

PICKLED_FILE = "/data/dateSelects"

api = responder.API(static_dir='./static')

def openPickledData():
    try:
        with open(PICKLED_FILE, 'rb') as f:
            data = pickle.load(f)
    except Exception:
        data = []

    return data

def savePickledData(data):
    try:
        with open(PICKLED_FILE, 'wb') as f:
            pickle.dump(data, f)
    except Exception:
        return False

    return True;

@api.route("/api/date-select/{date}")
class DateSelects:
    def on_get(self, req, resp, *, date):
        dateSelects = openPickledData()

        print(dateSelects)

        resp.headers = {"Content-Type": "application/json; charset=utf-8"} 
        resp.media = {"dateSelects": dateSelects}

    def on_post(self, req, resp, *, date):
        dateSelects = openPickledData()

        print(date)

        # 追加する
        dateSelects.append(date)
        
        # 重複を削除する
        dateSelects = list(set(dateSelects))

        print(dateSelects)


        status = savePickledData(dateSelects)

        # 返す値を設定する
        resp.headers = {"Content-Type": "application/json; charset=utf-8"} 
        resp.media = {"status": status}

    def on_delete(self, req, resp, *, date):
        dateSelects = openPickledData()

        # 削除する
        dateSelects = [x for x in dateSelects if x != date ]

        # 重複を削除する
        dateSelects = list(set(dateSelects))

        status = savePickledData(dateSelects)

        # 返す値を設定する
        resp.headers = {"Content-Type": "application/json; charset=utf-8"} 
        resp.media = {"status": status}

api.add_route("/", static=True)

if __name__ == '__main__':
    api.run()