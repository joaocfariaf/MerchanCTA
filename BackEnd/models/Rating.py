from sqlalchemy import Column, Integer, String, ForeignKey 
from sqlalchemy.orm import relationship

from config.DataBase import Base

class Rating(Base):
    __tablename__ = 'rating'

    id = Column(Integer, primary_key=True, autoincrement=True)
    rating = Column(Integer, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id"))
    store_id = Column(Integer, ForeignKey("stores.id"))

    def __init__(self, rating, user_id, store_id):
        Base()
        self.rating = rating
        self.user_id = user_id
        self.store_id = store_id

    def serialize(self):
        return {
            'rating': self.rating,
            'user_id': self.user_id,
            'store_id': self.store_id
        }
