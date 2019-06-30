import datetime

from sqlalchemy import Column, Integer, String, DateTime  
from sqlalchemy.orm import relationship

from config.DataBase import Base as Base
from config.DataBase import db_session as db

from app import bcrypt
import json

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    registered_on = Column(DateTime, nullable=False)

    stores = relationship("Store")
    ratings = relationship("Rating")

    def __init__(self, email, password):
        Base()
        self.email = email
        self.password = bcrypt.generate_password_hash(password).decode()

        self.registered_on = datetime.datetime.now()

    def save_to_db(self):
        db.add(self)
        db.commit()

    @staticmethod
    def verify_hash(hash, password):
        return bcrypt.check_password_hash(hash, password)

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email = email).first()

    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'password': self.password,
            'registered_on': self.registered_on
        }

    def __str__(self):
        return json.dumps(self.serialize(), default=myconverter)

# A special converter: from DateTime => string
def myconverter(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()