from flask_restful import Resource, reqparse

from models.Store import Store
from models.Product import Product
from config.DataBase import db_session as db

parser = reqparse.RequestParser()
parser.add_argument('name')
parser.add_argument('description')

class StoreApi(Resource):
    def get(self, store_id):
        store = Store.query.join(Product).filter(Store.id == store_id).first()
        return {
            'id': store.id,
            'name': store.name,
            'description': store.description,
            'products': list(map(lambda x : x.serialize(), store.products))
        }

    def put(self, store_id):
        args = parser.parse_args()
        store = Store.query.filter(Store.id == store_id).first()
        store.update({Store.name: args['name']})
        db.commit()
        return store.serialize()

class StoreListApi(Resource):
    def get(self):
        list_stores = Store.query.all()
        return list(map(lambda x : x.serialize(), list_stores))

    def post(self):
        args = parser.parse_args()
        store = Store(args['name'], args['description'])
        db.add(store)
        db.commit()
        return store.serialize(), 201
        