from django.urls import path, include
from .views import index, Login, Register

urlpatterns = [
    path('users', index.as_view()),
    path('login', Login.as_view()),
    path('register', Register.as_view())
]