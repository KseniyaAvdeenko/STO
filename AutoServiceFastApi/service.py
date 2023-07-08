from sqlalchemy import select, label, text, update, delete
from sqlalchemy.orm import Session
from AutoServiceFastApi.schemas import *
from AutoServiceFastApi.models import *
from datetime import date


# http GET
def get_all_clients(db: Session):
    return [{
        'cl_id': row.Clients.cl_id,
        'client_name': row.Clients.client_name,
        'city': row.Clients.city,
        'phone': row.Clients.phone,
        'car': {'car_id': row.Cars.car_id,
                'name': row.Cars.name}
    } for row in db.execute(select(Clients, Cars).join(Cars))]


def get_all_service(db: Session):
    return db.query(Service).all()


def get_all_orders(db: Session):
    client = select(Clients, Cars).join(Cars).subquery()
    return [{
        'so_id': r.ServiceOrders.so_id,
        'order_date': r.ServiceOrders.order_date,
        'diagnosis': r.ServiceOrders.diagnosis,
        'in_progress': r.ServiceOrders.in_progress,
        'is_finished': r.ServiceOrders.is_finished,
        'car_client': {
            'cl_id': r.cl_id,
            'client_name': r.client_name,
            'city': r.city,
            'phone': r.phone,
            'car': {
                'car_id': r.car_id,
                'name': r.name
            }
        }
    } for r in db.execute(select(
        ServiceOrders,
        client,
    ).join(client)).all()]


# http GET/{id}
def get_client(client_id: int, db: Session):
    row = db.query(
        Clients.cl_id,
        Clients.client_name,
        Clients.city,
        Clients.phone,
        Cars.car_id,
        Cars.name
    ).join(Cars).filter(Clients.cl_id == client_id).first()
    if row is not None:
        return {
            'cl_id': row[0],
            'client_name': row[1],
            'city': row[2],
            'phone': row[3],
            'car': {
                'car_id': row[4],
                'name': row[5]
            }
        }
    else:
        return {"response": "клиента с таким ID не существует"}


def get_service(service_id: int, db: Session):
    row = db.query(Service).get(service_id)
    if row is not None:
        return {"s_id": row.s_id, "type": row.type, "price": row.price}
    else:
        return {}


def get_service_order(order_id: int, db: Session):
    client = select(Clients, Cars).select_from(Cars).join(Cars.client).subquery()
    order = db.execute(select(
        ServiceOrders.so_id,
        ServiceOrders.order_date,
        ServiceOrders.diagnosis,
        ServiceOrders.in_progress,
        ServiceOrders.is_finished,
        client
    ).join(client).filter(ServiceOrders.so_id == order_id)).first()
    service_types_by_order = db.query(
        ServiceOrders,
        Service
    ).select_from(Service).join(Service.orders).filter(ServiceOrders.so_id == order_id).all()
    service = []
    for s in service_types_by_order:
        service.append({'s_id': s.Service.s_id, 'type': s.Service.type, 'price': s.Service.price})
    return {
        'so_id': order[0],
        'order_date': order[1],
        'diagnosis': order[2],
        'in_progress': order[3],
        'is_finished': order[4],
        'car_client': {
            'cl_id': order[5],
            'client_name': order[6],
            'city': order[8],
            'phone': order[7],
            'car': {
                'car_id': order[9],
                'name': order[10]
            }
        },
        'service': service
    }


# http POST
def create_service(data: ServiceSchema, db: Session):
    service = Service(type=data.type, price=data.price)
    db.add(service)
    db.commit()
    db.refresh(service)
    return service


def create_client(data: ClientsSchema, db: Session):
    new_car = Cars(name=data.car.name)
    db.add(new_car)
    db.commit()
    db.refresh(new_car)
    new_client = Clients(client_name=data.client_name, phone=data.phone, city=data.city, car=new_car.car_id)
    db.add(new_client)
    db.commit()
    db.refresh(new_client)
    return new_client.cl_id


def create_order(data: CreateServiceOrderSchema, db: Session):
    new_order = ServiceOrders(
        order_date=date.today(),
        car_client=data.car_client,
        diagnosis=True,
        in_progress=False,
        is_finished=False
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    for service in data.service:
        db.execute(service_orders_service.insert().values(service_order_id=new_order.so_id, service_id=service))
        db.commit()
    return new_order.so_id


# http PUT
def edit_service(service_id: int, data: ServiceSchema, db: Session):
    service = db.query(Service).get(service_id)
    service.type = data.type
    service.price = data.price
    db.add(service)
    db.commit()
    db.refresh(service)
    return service


def edit_client(client_id: int, data: ClientsSchema, db: Session):
    client = db.get(Clients, client_id)
    car = db.get(Cars, data.car.car_id)
    car.car_id = data.car.car_id
    car.name = data.car.name
    client.client_name = data.client_name
    client.city = data.city
    client.phone = data.phone
    db.add(car)
    db.commit()
    db.add(client)
    db.commit()
    db.refresh(car)
    db.refresh(client)
    return client.cl_id


def edit_order(order_id: int, data: CreateServiceOrderSchema, db: Session):
    order = db.get(ServiceOrders, order_id)
    order.order_date = data.order_date
    order.car_client = data.car_client
    order.diagnosis = data.diagnosis
    order.in_progress = data.in_progress
    order.is_finished = data.is_finished
    db.add(order)
    db.commit()
    db.execute(delete(service_orders_service).where(service_orders_service.c.service_order_id == order.so_id))
    for service in data.service:
        db.execute(service_orders_service.insert().values(service_order_id=order.so_id, service_id=service))
        db.commit()
    db.refresh(order)
    return order.so_id


# http delete
def delete_service(service_id: int, db: Session):
    service = db.query(Service).get(service_id)
    db.delete(service)
    db.commit()


def delete_client(client_id: int, db: Session):
    query = db.query(Clients.cl_id, Cars.car_id).join(Cars).filter(Clients.cl_id == client_id).first()
    client = db.get(Clients, query[0])
    db.delete(client)
    db.commit()
    car = db.get(Cars, query[1])
    db.delete(car)
    db.commit()


def delete_order(order_id: int, db: Session):
    db.execute(delete(service_orders_service).where(service_orders_service.c.service_order_id == order_id))
    db.delete(db.get(ServiceOrders, order_id))
    db.commit()
