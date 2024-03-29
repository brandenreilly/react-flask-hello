from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    uid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), unique=True)
    first_name = db.Column(db.String(250))
    last_name = db.Column(db.String(250))
    email = db.Column(db.String(250), unique=True)
    password = db.Column(db.String(250))
    postal_code = db.Column(db.Integer)
    playlists = db.relationship('Playlist', backref='user', lazy=True)
    
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            # do not serialize the password, its a security breach
        }
    
class Playlist(db.Model):
    pid = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey('user.uid'))
    playlist_name = db.Column(db.String(250), nullable=False)
    songs = db.Relationship('PlaylistSongs', backref='Playlist', lazy=True)

class PlaylistSongs(db.Model):
    psid = db.Column(db.Integer, primary_key=True)
    pid = db.Column(db.Integer, db.ForeignKey('playlist.pid'))
    song_name = db.Column(db.String(250), nullable=False)
    song_genre = db.Column(db.String(250), nullable=False)
    song_id = db.Column(db.Integer, nullable=False)