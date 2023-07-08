from pydantic import BaseModel, Field
from typing import Optional
from pydantic.types import date


class CarsSchema(BaseModel):
    car_id: Optional[int] = None
    name: Optional[str] = None

    class Config:
        orm_mode = True


class ClientsSchema(BaseModel):
    cl_id: Optional[int] = None
    client_name: str
    phone: str
    city: str
    car: CarsSchema

    class Config:
        orm_mode = True


class ServiceSchema(BaseModel):
    s_id: Optional[int] = None
    type: Optional[str] = None
    price: Optional[float] = Field(ge=0)

    class Config:
        orm_mode = True


class ServiceOrdersSchema(BaseModel):
    so_id: Optional[int] = None
    order_date: Optional[date] = None
    car_client: ClientsSchema
    diagnosis: bool
    in_progress: bool
    is_finished: bool

    class Config:
        orm_mode = True


class CreateServiceOrderSchema(BaseModel):
    so_id: Optional[int] = None
    order_date: Optional[date] = None
    car_client: int
    diagnosis: Optional[bool]
    in_progress: Optional[bool]
    is_finished: Optional[bool]
    service: list[int]

    class Config:
        orm_mode = True


