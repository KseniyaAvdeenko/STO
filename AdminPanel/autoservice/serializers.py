from rest_framework import serializers
from .models import *


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'phone',
            'tg_login',
            'tg_id',
            'is_employee',
            'date_joined',
            'first_name',
            'last_name',
            'is_staff'
        )
        extra_kwargs = {'id': {'read_only': True}}


class AdvantageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advantage
        fields = ('id', 'img', 'adv')


class TextAboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextAbout
        fields = ('id', 'text')


class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ('id', 'problem')


class NtfMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = NtfMethod
        fields = ('id', 'icon', 'method')