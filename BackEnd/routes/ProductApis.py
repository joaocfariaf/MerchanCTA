from flask_restful import Resource, reqparse

from models.Product import Product
from config.DataBase import db_session as db

parser = reqparse.RequestParser()
parser.add_argument('name')
parser.add_argument('description')
parser.add_argument('preco')
parser.add_argument('store_id')
parser.add_argument('label')

class ProductApi(Resource):
    def get(self):
        list_products = Product.query.all()
        return list(map(lambda x : x.serialize(), list_products))
    def post(self):
        args = parser.parse_args()
        product = Product(
            name=args['name'], 
            description=args['description'], 
            preco=args['preco'], 
            store_id=args['store_id'], 
            label=args['label'])
        db.add(product)
        db.commit()
        return product.serialize(), 201

        
