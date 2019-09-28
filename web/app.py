import responder

from models.date_selects import DateSelects

api = responder.API(static_dir='./static')

api.add_route("/", static=True)


@api.route("/api/date-select/{date}")
class DateSelectsAPI:
    def on_get(self, req, resp, *, date):
        model = DateSelects()
        dateSelects = model.get_all()

        resp.headers = {"Content-Type": "application/json; charset=utf-8"}
        resp.media = {"dateSelects": dateSelects}

    def on_post(self, req, resp, *, date):
        model = DateSelects()
        ret = model.add_data(date)

        # 返す値を設定する
        resp.headers = {"Content-Type": "application/json; charset=utf-8"}
        resp.media = {"status": ret}

    def on_delete(self, req, resp, *, date):
        model = DateSelects()
        ret = model.delete_data(date)

        # 返す値を設定する
        resp.headers = {"Content-Type": "application/json; charset=utf-8"}
        resp.media = {"status": ret}


if __name__ == '__main__':
    api.run()
