from datetime import datetime, timedelta

from pymongo import MongoClient
from decouple import config

mongo_client = MongoClient(config('MONGO_URL'))[config('MONGO_DB')]


class MongoCl:
    def __init__(self, client):
        self.client = client

    def get_all(self, collection_name):
        return [i for i in self.client[collection_name].find()]

    def get_one(self, collection_name, field_value):
        return self.client[collection_name].find_one({"_id": field_value})

    def insert_one(self, collection_name, data):
        item = self.client[collection_name].insert_one(data)
        return item.inserted_id

    def insert_many(self, collection_name, data):
        self.client[collection_name].insert_many(data)

    def update_one(self, collection_name, field_value, data):
        self.client[collection_name].update_one({'_id': field_value}, {"$set": data})
        return self.get_one(collection_name, field_value)

    def delete_one(self, collection_name, field_name, field_value):
        try:
            self.client[collection_name].delete_one({field_name: field_value})
        except(Exception,) as e:
            return {"message": "Error" + e}
        else:
            return {"message": "Success.Deleted"}


def get_all_orders():
    lookup_types = {
        '$lookup': {'from': 'service_types', 'localField': "service", 'foreignField': "_id", 'as': "service"}}
    lookup_client = {'$lookup': {'from': 'clients', 'localField': 'client', 'foreignField': "_id", 'as': 'client'}}
    projecting = {'$project': {'client.orders': 0}}
    sorting = {'$sort': {'order_date': 1}}
    find = mongo_client['orders'].aggregate([lookup_types, lookup_client, projecting, sorting])
    return [order for order in find]


def get_order(order_id):
    matching = {'$match': {'_id': order_id}}
    lookup_types = {
        '$lookup': {'from': 'service_types', 'localField': "service", 'foreignField': "_id", 'as': "service"}}
    lookup_client = {'$lookup': {'from': 'clients', 'localField': 'client', 'foreignField': "_id", 'as': 'client'}}
    return [order for order in mongo_client.orders.aggregate([lookup_types, lookup_client, matching])][0]


def get_all_clients():
    lookup = {'$lookup': {'from': 'orders', 'localField': "orders", 'foreignField': "_id", 'as': "orders"}}
    projecting = {'$project': {'orders.service': 0, 'orders.client': 0}}
    return [client for client in mongo_client.clients.aggregate([lookup, projecting])]


def get_client(client_id):
    matching = {'$match': {'_id': client_id}}
    lookup = {'$lookup': {'from': 'orders', 'localField': "orders", 'foreignField': "_id", 'as': "orders"}}
    projecting = {'$project': {'orders.service': 0, 'orders.client': 0}}
    return [client for client in mongo_client.clients.aggregate([matching, lookup, projecting])][0]


def get_apps_stats(from_date=None, to_date=None):
    grouping = {"$group": {"_id": {"$dateToString": {"format": "%Y-%m-%d", "date": "$date"}}, "quantity": {"$sum": 1}}}
    sorting = {"$sort": {"_id": 1}}
    if from_date and to_date:
        matching = {"$match": {'date': {"$gte": datetime.strptime(from_date, '%Y-%m-%d %H:%M:%S'),
                                        "$lte": datetime.strptime(to_date, '%Y-%m-%d %H:%M:%S')}}}
        return [stats for stats in mongo_client.applications.aggregate([matching, grouping, sorting])]
    else:
        return [stats for stats in mongo_client.applications.aggregate([grouping, sorting])]


def get_orders_stats(num=7, period='days'):
    lookup = {
        '$lookup': {'from': 'service_types', 'localField': "service", 'foreignField': "_id", 'as': "service"}}
    unwind = {"$unwind": "$service"}
    grouping = {"$group": {"_id": {"$dateToString": {"format": "%Y-%m-%d", "date": "$order_date"}},
                           "profit": {"$sum": "$service.price"}}}
    sorting = {"$sort": {"_id": 1}}
    end_date = datetime.now()
    period_data = {
        "days": timedelta(days=num),
        "weeks": timedelta(days=num * 7),
        "months": timedelta(days=num * 30)
    }
    if num:
        delta = timedelta(days=num)
        start_date = end_date - delta
        matching = {"$match": {'order_date': {"$gte": start_date, "$lte": end_date}}}
        return [stats for stats in mongo_client.orders.aggregate([matching, lookup, unwind, grouping, sorting])]
    if period:
        delta = period_data[period]
        start_date = end_date - delta
        matching = {"$match": {'order_date': {"$gte": start_date, "$lte": end_date}}}
        return [stats for stats in mongo_client.orders.aggregate([matching, lookup, unwind, grouping, sorting])]
    if num and period:
        delta = period_data[period]
        start_date = end_date - delta
        matching = {"$match": {'order_date': {"$gte": start_date, "$lte": end_date}}}
        return [stats for stats in mongo_client.orders.aggregate([matching, lookup, unwind, grouping, sorting])]
    else:
        return [stats for stats in mongo_client.orders.aggregate([lookup, unwind, grouping, sorting])]


def update_client_orders(client_id, data):
    mongo_client['clients'].update_one({'_id': client_id}, data)
    return client_id
