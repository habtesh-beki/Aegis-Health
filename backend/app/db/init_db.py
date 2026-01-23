from app.db.session import engine
from app.db.models import Base
# from db.session import engine
# from db.models import Base

def init_db():
    Base.metadata.create_all(bind=engine)
