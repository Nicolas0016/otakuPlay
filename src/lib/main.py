from animeflv import AnimeFLV

def create_anime_dict(anime):
    return {
        "name": anime.title,
        "specifications": {
            "animeid": anime.id,
            "title": anime.title,
            "poster": anime.poster,
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
        anime_list = [create_anime_dict(anime) for anime in anime_searched]
    return anime_list

def get_anime_info(id):
    with AnimeFLV() as api:
        description = api.get_anime_info(id)
        anime = create_anime_dict(description)
    return anime

def latest_animes():
    with AnimeFLV() as api:
        animes = api.get_latest_animes()
        anime_list = [create_anime_dict(anime) for anime in animes]
    return anime_list

def latest_episodes():
    with AnimeFLV() as api:
        episodes = api.get_latest_episodes()
        episode_list = [create_episode_dict(episode) for episode in episodes]
    return episode_list

def get_links(anime_id, episode_id):
    with AnimeFLV() as api:
        links_info = api.get_video_servers(episode=episode_id, id=anime_id)
        if isinstance(links_info, list) and len(links_info) > 0:
            links_info = links_info[0]
        links_list = [create_download_link_dict(link_info) for link_info in links_info]
    return links_list

anime_id = 'Oshi no ko'
episode_id = '1'
links = search("Dragon+ball")
print(links)
