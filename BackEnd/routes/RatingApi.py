from flask_restful import Resource, reqparse

from models.Rating import Rating
from models.Store import Store
from config.DataBase import db_session as db

parser = reqparse.RequestParser()
parser.add_argument('store_id', help = 'This field cannot be blank', required = True)
parser.add_argument('rating', help = 'This field cannot be blank', required = True)

class RantingApi(Resource):
    def post(self, user_id):
        args = parser.parse_args()
        list_ratings = Rating.query.filter(Rating.user_id == user_id).all()

        for line in list_ratings:
            if (line.store_id == int(args['store_id'])):
                line.rating = args['rating']
                db.commit()

                updateRating(args['store_id'])
                return line.serialize(), 200
                
        rating = Rating(
            user_id=user_id, 
            store_id=args['store_id'],
            rating=args['rating'])
        db.add(rating)
        db.commit()

        updateRating(args['store_id'])
        return rating.serialize(), 200

def updateRating(store_id):
    list_ratings = Rating.query.filter(Rating.store_id == store_id).all()

    acc = 0
    for line in list_ratings:
        acc = acc + line.rating
    
    new_value = round(acc/len(list_ratings))
    store = Store.query.filter(Store.id == store_id).first()
    store.rating = new_value
    db.commit()
