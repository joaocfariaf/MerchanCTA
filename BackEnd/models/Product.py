import decimal

from sqlalchemy import Column, Integer, String, DECIMAL, ForeignKey

from config.DataBase import Base

import simplejson as json

class Product(Base):
    __tablename__ = 'products'

    allowed_labels = ['COMIDAS', 'TRANSPORTE', 'OUTROS']

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(80), nullable=False)
    description = Column(String(500), nullable=False)
    preco = Column(DECIMAL(12,2), nullable=False)
    label = Column(String(20), nullable=False)
    
    store_id = Column(Integer, ForeignKey("stores.id"))

    def __init__(self, name, description, preco, store_id, label):
        if (label not in self.allowed_labels):
            raise ValueError('Invalid label. Check allowed_labels!')

        self.name = name 
        self.description = description
        self.preco = preco
        self.store_id = store_id
        self.label = label

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'preco': json.dumps(self.preco, use_decimal=True),
            'store_id': self.store_id,
            'label': self.label
        }    
