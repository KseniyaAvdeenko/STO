import datetime
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, permissions, generics
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import *
from .models import *
from .tg_sender.tg_sender import send_app_tg
from pymongo import MongoClient
from decouple import config

mongo_client = MongoClient(config("MONGO_URL"))[config("MONGO_DB")]


class UserView(generics.RetrieveUpdateAPIView):
    serializer_class = UsersSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user


class UsersView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsersSerializer
    permission_classes = (permissions.IsAdminUser,)
    http_method_names = ['get', 'put', 'patch', 'delete']


def form_message(service_types, car, name, phone, ntf_method, date):
    current_date = date.strftime('%Y-%m-%d')
    message = f'Оставлена заявка с AutoServiceApp {current_date}:\n\n'
    for s_t in service_types:
        message += 'Вид обслуживания: {} \n'.format(s_t)
    message += '\nДанные клиента:\n'
    message += 'Авто - {}\n'.format(car)
    message += 'ФИО - {}\n'.format(name)
    message += 'Телефон - {}\n'.format(phone)
    message += 'Метод связи - {}\n'.format(ntf_method)
    return message


def send_app_to_tg(data):
    msg = form_message(data['types'], data['car'], data['name'], data['phone'], data['ntf_method'], data['date'])
    send_app_tg(msg)


@csrf_exempt
@permission_classes([AllowAny])
def send_tg_data(request):
    data = json.loads(request.body)
    data['date'] = datetime.datetime.utcnow()
    send_app_to_tg(data)
    mongo_client.applications.insert_one(data)
    return JsonResponse(data)


class AdvantagesView(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        queryset = Advantage.objects.all()
        serializer = AdvantageSerializer(queryset, many=True)
        return Response(serializer.data)


class TextAboutView(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        queryset = TextAbout.objects.all()
        serializer = TextAboutSerializer(queryset, many=True)
        return Response(serializer.data)


class ProblemsView(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        queryset = Problem.objects.all()
        serializer = ProblemSerializer(queryset, many=True)
        return Response(serializer.data)


class NtfMethodsView(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        queryset = NtfMethod.objects.all()
        serializer = NtfMethodSerializer(queryset, many=True)
        return Response(serializer.data)
