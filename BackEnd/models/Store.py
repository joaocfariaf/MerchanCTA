from sqlalchemy import Column, Integer, String  
from sqlalchemy.orm import relationship

from config.DataBase import Base

class Store(Base):
    __tablename__ = 'stores'

    id = Column(Integer, primary_key=True)
    name = Column(String(80), unique=True ,nullable=False)
    description = Column(String(500), nullable=False)

    products = relationship("Product")

    def __init__(self, name, description):
        Base()
        self.name = name
        self.description = description

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }
