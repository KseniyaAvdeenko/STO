from pymongo import MongoClient


class MongoCl:
    def __init__(self, connection_url, db_name):
        self.connection_url = connection_url
        self.db_name = db_name

    def get_mongo_client(self):
        return MongoClient(self.connection_url)[self.db_name]

    def get_all(self, collection_name):
        db_client = self.get_mongo_client()
        return db_client[collection_name].find()

    def get_one(self, collection_name, field_name, field_value):
        db_client = self.get_mongo_client()
        return db_client[collection_name].find_one({field_name: field_value})

    def insert_one(self, collection_name, data):
        db_client = self.get_mongo_client()
        db_client[collection_name].insert_one(data)
        return self.get_one(collection_name, '_id', data["_id"])

    # def insert_many(self, collection_name, data):
    #     db_client = self.get_mongo_client()
    #     db_client[collection_name].insert_many(data)

    def update_one(self, collection_name, field_value, data):
        db_client = self.get_mongo_client()
        db_client[collection_name].replace_one({'_id': field_value}, data)
        return self.get_one(collection_name, '_id', field_value)

    def delete_one(self, collection_name, field_value):
        db_client = self.get_mongo_client()
        try:
            db_client[collection_name].delete_one({'_id': field_value})
        except(Exception,) as e:
            return {"message": "Error" + e}
        else:
            return {"message": "Success.Deleted"}



