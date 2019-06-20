from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('postgres://ipzpslgd:bsbk9FbuwE0MbKulIi3X02f_BWq14CwG@isilo.db.elephantsql.com:5432/ipzpslgd', 
                        convert_unicode=True, pool_size=5, max_overflow=0)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))

Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    from models.User import User
    from models.Store import Store
    from models.Product import Product

def config_db():
    from models.User import User
    from models.Store import Store
    from models.Product import Product
    Base.metadata.create_all(bind=engine)
