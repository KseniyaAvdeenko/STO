from django.db import models

from django.db import models

from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    phone = models.CharField(max_length=30, verbose_name='Номер телефона', blank=True)
    tg_login = models.CharField(max_length=30, verbose_name='Телеграмм логин', null=True, unique=True)
    tg_id = models.CharField(max_length=20, verbose_name="Tg_ID", blank=True)
    is_employee = models.BooleanField(default=False, verbose_name='Сотрудник')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


# FOR LANDING PAGE
class Advantage(models.Model):
    img = models.ImageField(verbose_name="Картинка")
    adv = models.TextField(verbose_name='Преимущество')

    class Meta:
        db_table = "advantages"
        verbose_name = 'Преимущество'
        verbose_name_plural = 'Преимущества'
        ordering = ['id']


    def __str__(self):
        return '%s' % (self.adv,)


class TextAbout(models.Model):
    text = models.TextField(verbose_name="Инфо")

    class Meta:
        db_table = "about_text"
        verbose_name = 'Инфо'
        verbose_name_plural = 'Инфо'
        ordering = ['id']


class Problem(models.Model):
    problem = models.CharField(max_length=255, verbose_name='Причины поломки')

    class Meta:
        db_table = "problems"
        verbose_name = 'Причина поломки'
        verbose_name_plural = 'Причины поломки'
        ordering = ['id']

    def __str__(self):
        return '%s' % (self.problem,)


class NtfMethod(models.Model):
    icon = models.ImageField(verbose_name="Иконка")
    method = models.CharField(max_length=15, verbose_name="Метод")

    class Meta:
        db_table = "ntf_methods"
        verbose_name = 'Метод оповещения'
        verbose_name_plural = 'Методы оповещения'
        ordering = ['id']

    def __str__(self):
        return '%s' % (self.method,)