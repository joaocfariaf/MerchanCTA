from sqlalchemy import Column, Integer, String, DateTime  
from sqlalchemy.orm import relationship

from config.DataBase import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    registered_on = Column(DateTime, nullable=False)

    def __init__(self, email, password, registered_on):
        Base()
        self.email = email
        self.password = password
        self.registered_on = registered_on

    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'password': self.password,
            'registered_on': self.registered_on
        }
