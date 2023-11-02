from app.models import db, Review, environment, SCHEMA
from datetime import date
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review (
        user_id = 1,
        review_id = 1,
        text = 'Smooth transaction',
        created_at = date.today()
    )
    db.session.add(review1)

    db.session.commit()



def undo_reviews():
    if environment == 'production':
          db.session.execute(f"TRUNCATE table {SCHEMA}.review RESTART IDENTITY CASCADE;")
    else:
      db.session.execute(text("DELETE FROM review"))

    db.session.commit()