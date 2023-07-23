from datetime import datetime

from fastapi import APIRouter, Depends
from pymongo import MongoClient
from sqlalchemy.orm import Session
from AutoServiceFastApi import schemas
from AutoServiceFastApi.mongo_service import *
from database import get_db
import service
from schemas import *

router = APIRouter()


# HTTP GET
@router.get('/service/')
async def get_all_service():
    return [type for type in MongoCl(mongo_client).get_all('service_types')]


@router.get('/clients/')
async def get_clients():
    return get_all_clients()


@router.get('/service_orders/')
async def get_orders():
    return get_all_orders()


@router.get('/application_stats/')
async def get_apps_statistics(from_date: str | None = None, to_date: str | None = None):
    if from_date and to_date:
        return get_apps_stats(from_date, to_date)
    else:
        return get_apps_stats()


@router.get('/orders-stats/')
async def get_orders_statistics(num: int = 7, period: str = "days"):
    if num:
        return get_orders_stats(num)
    elif period:
        return get_orders_stats(period)
    elif num and period:
        return get_orders_stats(num, period)
    else:
        return get_orders_stats()


# HTTP GET BY ID
@router.get('/service/{service_id}/')
async def get_service(service_id: int = None):
    return MongoCl(mongo_client).get_one('service_types', service_id)


@router.get('/clients/{client_id}/')
async def get_client_by_id(client_id: int = None):
    return get_client(client_id)


@router.get('/service_orders/{order_id}/')
async def get_service_order(order_id: int = None):
    return get_order(order_id)


# # HTTP POST
@router.post('/create_service/', status_code=201)
async def create_service(data: dict):
    return MongoCl(mongo_client).get_one('service_types',
                                         MongoCl(mongo_client).insert_one('service_types', data))


@router.post('/create_client/', status_code=201)
async def create_client(data: dict):
    return MongoCl(mongo_client).get_one('clients', MongoCl(mongo_client).insert_one('clients', data))


@router.post('/create_order/', status_code=201)
async def create_order(data: dict):
    data['order_date'] = datetime.now()
    return MongoCl(mongo_client).get_one('orders', MongoCl(mongo_client).insert_one('orders', data))


# # HTTP PUT
@router.put('/edit_service/{service_id}/')
async def edit_service(service_id: int, data: dict):
    return MongoCl(mongo_client).update_one('service_types', service_id, data)


@router.put('/edit_client/{client_id}/')
async def edit_service(client_id: int, data: dict):
    return MongoCl(mongo_client).update_one('clients', client_id, data)


@router.put('/edit_client_orders/{client_id}')
async def edit_client_order(client_id: int, data: dict):
    return get_client(update_client_orders(client_id, {'$push': data}))


@router.put('/edit_order/{order_id}/')
async def edit_order(order_id: int, data: dict):
    return MongoCl(mongo_client).update_one('orders', order_id, data)


# # HTTP DELETE
@router.delete('/delete_service/{service_id}/')
async def delete_service(service_id: int):
    return MongoCl(mongo_client).delete_one('service_types', '_id', service_id)


@router.delete('/delete_client/{client_id}/')
async def delete_client(client_id: int):
    MongoCl(mongo_client).delete_one('orders', 'client', client_id)
    return MongoCl(mongo_client).delete_one('clients', '_id', client_id)


@router.delete('/delete_order/{order_id}/')
async def delete_order(order_id: int):
    client_id = get_order(order_id)['client'][0]['_id']
    update_client_orders(client_id, {'$pull': {'orders': order_id}})
    return MongoCl(mongo_client).delete_one('orders', '_id', order_id)


# # HTTP GET
# @router.get('/clients/', response_model=list[ClientsSchema])
# async def get_clients(db: Session = Depends(get_db)):
#     return service.get_all_clients(db)
#
#
# @router.get('/service/', response_model=list[ServiceSchema])
# async def get_all_service(db: Session = Depends(get_db)):
#     return service.get_all_service(db)
#
#
# @router.get('/service_orders/', response_model=list[ServiceOrdersSchema])
# async def get_orders(db: Session = Depends(get_db)):
#     return service.get_all_orders(db)
#
#
# # HTTP GET BY ID
# @router.get('/clients/{client_id}/')
# async def get_client(client_id: int = None, db: Session = Depends(get_db)):
#     return service.get_client(client_id, db)
#
#
# @router.get('/service/{service_id}/', response_model=ServiceSchema)
# async def get_service(service_id: int = None, db: Session = Depends(get_db)):
#     return service.get_service(service_id, db)
#
#
# @router.get('/service_orders/{order_id}/')
# async def get_service_order(order_id: int = None, db: Session = Depends(get_db)):
#     return service.get_service_order(order_id, db)
#
#
# # HTTP POST
# @router.post('/create_service/', status_code=201)
# async def create_service(data: ServiceSchema, db: Session = Depends(get_db)):
#     return service.create_service(data, db)
#
#
# @router.post('/create_client/', status_code=201)
# async def create_client(data: ClientsSchema, db: Session = Depends(get_db)):
#     return service.get_client(service.create_client(data, db), db)
#
#
# @router.post('/create_order/', status_code=201)
# async def create_client(data: CreateServiceOrderSchema, db: Session = Depends(get_db)):
#     service.create_order(data, db)
#     return service.get_service_order(service.create_order(data, db), db)
#
#
# # HTTP PUT
# @router.put('/edit_service/{service_id}/')
# async def edit_service(service_id: int, data: ServiceSchema, db: Session = Depends(get_db)):
#     return service.edit_service(service_id, data, db)
#
#
# @router.put('/edit_client/{client_id}/')
# async def edit_service(client_id: int, data: ClientsSchema, db: Session = Depends(get_db)):
#     return service.get_client(service.edit_client(client_id, data, db), db)
#
#
# @router.put('/edit_order/{order_id}/')
# async def edit_order(order_id: int, data: CreateServiceOrderSchema, db: Session = Depends(get_db)):
#     return service.get_service_order(service.edit_order(order_id, data, db), db)
#
#
# # HTTP DELETE
# @router.delete('/delete_service/{service_id}/')
# async def delete_service(service_id: int, db: Session = Depends(get_db)):
#     return service.delete_service(service_id, db)
#
#
# @router.delete('/delete_client/{client_id}/')
# async def delete_client(client_id: int, db: Session = Depends(get_db)):
#     return service.delete_client(client_id, db)
#
#
# @router.delete('/delete_order/{order_id}/')
# async def delete_order(order_id: int, db: Session = Depends(get_db)):
#     return service.delete_order(order_id, db)
