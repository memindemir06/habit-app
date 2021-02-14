# from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import generics, status
from .models import Users
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer


class index(generics.ListAPIView):
   queryset = Users.objects.all()
   serializer_class = UserSerializer


class Register(APIView):
    serializer_class = RegisterSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            dob = serializer.data.get('dob')

            if not self.request.session.exists(self.request.session.session_key):
                # If they don't have a session -> create one
                self.request.session.create()
            
            user = Users(first_name=first_name, last_name=last_name, email=email, password=password, dob=dob)
            user.save()

            self.request.session['user_id'] = user.user_id
            return Response(RegisterSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):
    # serializer_class = LoginSerializer
    lookup_url_kwarg_email = 'email'
    lookup_url_kwarg_password = 'password'
    
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            # If they don't have an active session -> create one
            self.request.session.create() 
            
        email = request.data.get(self.lookup_url_kwarg_email)
        password = request.data.get(self.lookup_url_kwarg_password)

        if (email != None and password != None):
            user_result = Users.objects.filter(email=email, password=password)

            if len(user_result) > 0:
                user = user_result[0]
                self.request.session['user_id'] = user.user_id
                # serializer = self.serializer_class(data=user.user_id)

                return Response(LoginSerializer(user).data, status=status.HTTP_200_OK) 
            
            return Response({"Bad Request", "Invalid Login Details"}, status=status.HTTP_400_BAD_REQUEST) 
            
        return Response({"Bad Request", "Invalid post data, did not find the email and password"}, status=status.HTTP_400_BAD_REQUEST) 



class activeSession(APIView):
    pass

