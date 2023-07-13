from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from AutoServiceFastApi import schemas
from AutoServiceFastApi.mongo_db_client import MongoCl
from database import get_db
import service
from schemas import *

router = APIRouter()
mongo_url = 'mongodb://localhost:27017'
db_name = 'Autoservice'


# HTTP GET
@router.get('/service/')
async def get_all_service():
    return [type for type in MongoCl(mongo_url, db_name).get_all('service_types')]


@router.get('/service_orders/')
async def get_orders():
    return [order for order in MongoCl(mongo_url, db_name).get_all('orders')]


# HTTP GET BY ID
@router.get('/service/{service_id}/')
async def get_service(service_id: int = None):
    return MongoCl(mongo_url, db_name).get_one('service_types', '_id', service_id)


@router.get('/service_orders/{order_id}/')
async def get_service_order(order_id: int = None):
    return MongoCl(mongo_url, db_name).get_one('orders', '_id', order_id)


# # HTTP POST
@router.post('/create_service/', status_code=201)
async def create_service(data: dict):
    return MongoCl(mongo_url, db_name).insert_one('service_types', data)


@router.post('/create_order/', status_code=201)
async def create_client(data: dict):
    return MongoCl(mongo_url, db_name).insert_one('orders', data)


# # HTTP PUT
@router.put('/edit_service/{service_id}/')
async def edit_service(service_id: int, data: dict):
    return MongoCl(mongo_url, db_name).update_one('service_types', service_id, data)


@router.put('/edit_order/{order_id}/')
async def edit_order(order_id: int, data: dict):
    return MongoCl(mongo_url, db_name).update_one('orders', order_id, data)


# # HTTP DELETE
@router.delete('/delete_service/{service_id}/')
async def delete_service(service_id: int):
    return MongoCl(mongo_url, db_name).delete_one('service_types', service_id)


@router.delete('/delete_order/{order_id}/')
async def delete_order(order_id: int):
    return MongoCl(mongo_url, db_name).delete_one('orders', order_id)

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
