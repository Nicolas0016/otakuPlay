from flask import Flask, jsonify, request
from animeflv import AnimeFLV
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  

def create_anime_dict(anime):
    return {
            "animeid": anime.id,
            "title": anime.title,
            "poster":  anime.poster,
            "banner": anime.banner,
            "synopsis": anime.synopsis,
            "rating": anime.rating,
            "genres": anime.genres,
            "debut": anime.debut,
            "type": anime.type,
            "episodes": [
                {
                    "id": episode.id,
                    "anime": episode.anime,
                    "image_preview": episode.image_preview
                }
                for episode in anime.episodes
            ] if anime.episodes else []
    }

def create_episode_dict(episode):
    return {
        "id": episode.id,
        "anime": episode.anime,
        "image_preview": episode.image_preview
    }

def create_download_link_dict(link_info):
    return {
        "server": link_info.get('server'),
        "title": link_info.get('title', ''),
        "url": link_info.get('url', ''),
        "code": link_info.get('code', ''),
        "allow_mobile": link_info.get('allow_mobile', False),
        "ads": link_info.get('ads', 0)
    }

def search(name):
    with AnimeFLV() as api:
        anime_searched = api.search(name)
        return [create_anime_dict(anime) for anime in anime_searched]

def get_anime_info(id):
    with AnimeFLV() as api:
        description = api.get_anime_info(id)
        return create_anime_dict(description)

def latest_animes():
    with AnimeFLV() as api:
        animes = api.get_latest_animes()
        return [create_anime_dict(anime) for anime in animes]

def latest_episodes():
    with AnimeFLV() as api:
        episodes = api.get_latest_episodes()
        return [create_episode_dict(episode) for episode in episodes]

def get_links(anime_id, episode_id):
    with AnimeFLV() as api:
        links_info = api.get_video_servers(episode=episode_id, id=anime_id)
        if isinstance(links_info, list) and len(links_info) > 0:
            links_info = links_info[0]
        return [create_download_link_dict(link_info) for link_info in links_info]

@app.route("/", methods=['GET'])
def main():
    return {"messaje" : "hola"}

@app.route("/search/<string:name>", methods=['GET'])
def search_anime(name):
    return jsonify(search(name))

@app.route("/anime/<string:id>", methods=['GET'])
def get_anime(id):
    return jsonify(get_anime_info(id))

@app.route("/latest-animes", methods=['GET'])
def get_latest_animes():
    return jsonify(latest_animes())

@app.route("/latest-episodes", methods=['GET'])
def get_latest_episodes():
    return jsonify(latest_episodes())

@app.route("/links/<string:anime_id>/<string:episode_id>", methods=['GET'])
def get_video_links(anime_id, episode_id):
    return jsonify(get_links(anime_id, episode_id))

if __name__ == '__main__':
    app.run(debug=True, port=5000)