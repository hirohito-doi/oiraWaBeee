import responder

api = responder.API(static_dir='./static')

api.add_route("/", static=True)

if __name__ == '__main__':
    api.run()