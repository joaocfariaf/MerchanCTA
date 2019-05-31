from flask import Flask
from flask_restful import Api 
from flask_heroku import Heroku
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

from config.DataBase import init_db
init_db()

from routes.StoreApis import StoreApi, StoreListApi
from routes.ProductApis import ProductApi

api.add_resource(StoreListApi, '/store')
api.add_resource(StoreApi, '/store/<string:store_id>')
api.add_resource(ProductApi, '/product')
# api.add_resource(ProductListApi, '/product/<string:store_id>')

heroku = Heroku(app)

if __name__ == '__main__':
    app.run()