import pickle
import datetime


class DateSelects():

    pickled_file = "/data/dateSelects"

    def open_pickled_data(self):
        try:
            with open(self.pickled_file, 'rb') as f:
                data = pickle.load(f)
        except Exception:
            data = []

        return data

    def save_pickled_data(self, data):
        try:
            with open(self.pickled_file, 'wb') as f:
                pickle.dump(data, f)
        except Exception:
            return False

        return True

    def get_all(self):
        return self.open_pickled_data()

    def add_data(self, date):
        date_selects = self.open_pickled_data()

        # 追加する
        date_selects.append(date)
        
        # 重複を削除する
        date_selects = list(set(date_selects))

        # 不要になった過去データを削除する
        today = datetime.date.today()
        date_selects = [
            x for x in date_selects if datetime.date.fromisoformat(x) > today
        ]

        return self.save_pickled_data(date_selects)

    def delete_data(self, date):
        date_selects = self.open_pickled_data()

        # 削除する
        date_selects = [x for x in date_selects if x != date]

        # 重複を削除する
        date_selects = list(set(date_selects))

        # 不要になった過去データを削除する
        today = datetime.date.today()
        date_selects = [
            x for x in date_selects if datetime.date.fromisoformat(x) > today
        ]

        return self.save_pickled_data(date_selects)