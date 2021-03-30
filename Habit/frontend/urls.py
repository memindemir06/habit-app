from django.urls import path, include
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('register', index),
    path('login', index),
    path('home', index),
    path('myprofile', index),
    path('friends', index),
    path('leaderboard', index),
    path('inspire', index),
    path('profile/<str:username>', index),
    path('intro', index),
    path('ErrorPage', index),
    path('quotes.txt', index),
    path('map', index),
]
