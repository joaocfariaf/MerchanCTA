from flask_restful import Resource, reqparse

from models.Store import Store
from models.User import User
from config.DataBase import db_session as db

from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)

parser = reqparse.RequestParser()
parser.add_argument('email', help = 'This field cannot be blank', required = True)
parser.add_argument('password', help = 'This field cannot be blank', required = True)

class UserRegistration(Resource):
    def post(self):
        data = parser.parse_args()

        if(User.find_by_email(data['email'])):
            return {'message': 'User {} already exists'. format(data['email'])}

        new_user = User(
            email = data['email'],
            password = data['password']
        )
        print(new_user)
        try:
            new_user.save_to_db()
            access_token = create_access_token(identity = data['email'])
            refresh_token = create_refresh_token(identity = data['email'])
            return {
                'message': 'User {} was created'.format(data['email']),
                'user_email': new_user.email,
                'user_id': new_user.id,
                'access_token': access_token,
                'refresh_token': refresh_token
            }, 200
        except:
            return {'message': 'Something went wrong'}, 500


class UserLogin(Resource):
    def post(self):
        data = parser.parse_args()
        try:
            current_user = User.find_by_email(data['email'])

            if not current_user:
                return {'message': 'Email {} isn\'t registered'.format(data['email'])}, 403
            
            if User.verify_hash(current_user.password, data['password']):
                access_token = create_access_token(identity = data['email'])
                refresh_token = create_refresh_token(identity = data['email'])
                return {
                    'message': 'Logged in as {}'.format(current_user.email),
                    'user_email': current_user.email,
                    'user_id': current_user.id,
                    'access_token': access_token,
                    'refresh_token': refresh_token
                }, 200
            else:
                return {'message': 'Wrong credentials'}, 403
        except:
            return {'message': 'Something went wrong'}, 500 
      
      
class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity = current_user)
        return {'access_token': access_token}
      
      
class AllUsers(Resource):
    def get(self):
        return {'message': 'List of users'}

    def delete(self):
        return {'message': 'Delete all users'}
      

class SecretResource(Resource):
    @jwt_required
    def get(self):
        return {
            'answer': 42
        }

class GetStoresFromUser(Resource):
    def get(self, user_id):
        list_stores = Store.query.filter(Store.user_id == user_id).all()
        return list(map(lambda x : x.serialize(), list_stores))
      