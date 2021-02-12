from django.urls import path, include
from .views import index

urlpatterns = [
    path('users/', index.as_view()),
]