from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Users
from .serializers import UserSerializer

class index(generics.ListAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

