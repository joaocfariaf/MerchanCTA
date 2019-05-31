from sqlalchemy import Column, Integer, String, ForeignKey

from config.DataBase import Base

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True)
    name = Column(String(80), nullable=False)
    description = Column(String(500), nullable=False)
    
    store_id = Column(Integer, ForeignKey("stores.id"))

    def __init__(self, name, description, store_id):
        self.name = name 
        self.description = description
        self.store_id = store_id

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'store_id': self.store_id
        }
