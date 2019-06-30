from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('postgres://yzmcoqod:U1bwRQnYd11GtJXe2IHngv84bFTUO-FN@raja.db.elephantsql.com:5432/yzmcoqod', 
                        convert_unicode=True, pool_size=5, max_overflow=0)
db_session = scoped_session(sessionmaker(bind=engine))

Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    from models.User import User
    from models.Store import Store
    from models.Product import Product
    from models.Rating import Rating

def config_db():
    from models.User import User
    from models.Store import Store
    from models.Product import Product
    from models.Rating import Rating
    Base.metadata.create_all(bind=engine)
