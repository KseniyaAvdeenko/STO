from pymongo import MongoClient


class MongoCl:
    def __init__(self, connection_url, db_name):
        self.connection_url = connection_url
        self.db_name = db_name

    def get_mongo_client(self):
        return MongoClient(self.connection_url)[self.db_name]

    def insert_data(self, collection_name, data):
        db_client = self.get_mongo_client()
        db_client[collection_name].insert_one(data)

