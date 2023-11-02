from .db import db, environment, SCHEMA, add_prefix_for_prod

class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == 'production':
        __table_args__ = { 'schema': SCHEMA }

    id = db.Column(db.Integer, primary_key=True)
    photocard_listing_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('post.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable=False)

    user = db.relationship('User', back_populates='favorite')
    photocard_listing = db.relationship('Photocard_listing', back_populates='favorite')
    photocard_image = db.relationship('Photocard_image', back_populates='favorite')

    def to_dict(self):
        return {
            'id': self.id,
            'photocard_listing_id': self.photocard_listing_id,
            'userId': self.user_id
        }