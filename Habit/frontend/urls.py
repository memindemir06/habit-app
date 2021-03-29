from django.urls import path, include
from .views import index

app_name = 'frontend'

# url(r'^.*$', index.as_view(), name="home")

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
    path(r'^.*$', index),
    path('quotes.txt', index),
]
