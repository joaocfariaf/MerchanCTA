from flask_restful import Resource, reqparse

from models.Product import Product
from config.DataBase import db_session as db

parser = reqparse.RequestParser()
parser.add_argument('name')
parser.add_argument('description')
parser.add_argument('store_id')

class ProductApi(Resource):
    def get(self):
        list_products = Product.query.all()
        return list(map(lambda x : x.serialize(), list_products))
    def post(self):
        args = parser.parse_args()
        product = Product(args['name'], args['description'], args['store_id'])
        db.add(product)
        db.commit()
        return product.serialize(), 201

        
