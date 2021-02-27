from django.urls import path, include
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('register', index),
    path('<str:userId>', index),
    path('profile/<str:userId>', index),
    path('friends/<str:userId>', index),
]