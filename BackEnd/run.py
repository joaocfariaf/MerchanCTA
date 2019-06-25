from flask import Flask
from flask_restful import Api 
from flask_heroku import Heroku
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

from config.DataBase import init_db
#init_db()

app = Flask(__name__)

CORS(app)
bcrypt = Bcrypt(app)

app.config['JWT_SECRET_KEY'] = 'nao_sabendo_que_era_impossivel,foi_la_e_descobriu'
jwt = JWTManager(app)

api = Api(app)

heroku = Heroku(app)

if __name__ == '__main__':
    from routes.StoreApis import StoreApi, StoreListApi
    from routes.ProductApis import ProductApi

    api.add_resource(StoreListApi, '/store')
    api.add_resource(StoreApi, '/store/<string:store_id>')
    api.add_resource(ProductApi, '/product')

    from routes.AuthApi import UserRegistration
    from routes.AuthApi import UserLogin
    from routes.AuthApi import TokenRefresh
    from routes.AuthApi import AllUsers
    from routes.AuthApi import SecretResource

    api.add_resource(UserRegistration, '/registration')
    api.add_resource(UserLogin, '/login')
    api.add_resource(TokenRefresh, '/token/refresh')
    api.add_resource(AllUsers, '/users')
    api.add_resource(SecretResource, '/secret')

    
    app.run()