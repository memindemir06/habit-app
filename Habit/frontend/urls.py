from django.urls import path, include
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('register', index),
    path('login', index),
    path('home', index),
    path('profile', index),
    path('friends', index),
    path('leaderboard', index),
    path('inspire', index),
]