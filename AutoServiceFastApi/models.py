from datetime import date
from sqlalchemy.orm import relationship
from sqlalchemy import Table, Column, Integer, ForeignKey, String, Float, Date, Boolean, Text

from AutoServiceFastApi.database import Base

service_orders_service = Table(
    "service_orders_service",
    Base.metadata,
    Column('service_order_id', Integer, ForeignKey('service_orders.so_id')),
    Column("service_id", Integer, ForeignKey('service.s_id'))
)


class Cars(Base):
    __tablename__ = "cars"
    car_id = Column(Integer, primary_key=True, index=True, unique=True)
    name = Column(String(100))
    client = relationship("Clients", backref='cars')

    def __repr__(self):
        return f'{self.name}'


class Clients(Base):
    __tablename__ = "clients"
    cl_id = Column(Integer, primary_key=True, index=True, unique=True)
    client_name = Column(String(255), nullable=False)
    phone = Column(String(255), nullable=True)
    city = Column(String(100), nullable=False)
    car = Column(Integer, ForeignKey('cars.car_id'))
    service_order = relationship("ServiceOrders", backref='clients')

    def __repr__(self):
        return f'{self.client_name}'


class Service(Base):
    __tablename__ = "service"
    s_id = Column(Integer, primary_key=True, index=True, unique=True)
    type = Column(String(300), nullable=False)
    price = Column(Float, nullable=False)
    orders = relationship("ServiceOrders", secondary=service_orders_service, back_populates='service', lazy=True)

    def __repr__(self):
        return f'{self.type}'


class ServiceOrders(Base):
    __tablename__ = "service_orders"
    so_id = Column(Integer, primary_key=True, index=True, unique=True)
    order_date = Column(Date, default=date.today)
    service = relationship('Service', secondary=service_orders_service, back_populates='orders', lazy=True)
    car_client = Column(Integer, ForeignKey("clients.cl_id"))
    diagnosis = Column(Boolean, default=True)
    in_progress = Column(Boolean, default=False)
    is_finished = Column(Boolean, default=False)

    def __repr__(self):
        return f'{self.order_date}'



