from django.urls import path, include, re_path
from rest_framework.routers import SimpleRouter

from .api import *

router = SimpleRouter()
router.register('admin_site/employees', UsersView, basename='employees')

urlpatterns = [
    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
    path('profile/', UserView.as_view(), name='profile'),
    path('service_app/', send_tg_data, name='api-send-tg-data'),
    path('advantages/', AdvantagesView.as_view({'get': 'list'}), name='advantages'),
    path('about/', TextAboutView.as_view({'get': 'list'}), name="about"),
    path('problems/', ProblemsView.as_view({'get': 'list'}), name="problems"),
    path('ntf_methods/', NtfMethodsView.as_view({'get': 'list'}), name="ntf_methods"),
    path('', include(router.urls)),
]
