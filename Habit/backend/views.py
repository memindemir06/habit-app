from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import generics, status
from .models import Users, UserHabits 
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, UserHabitsSerializer


class index(generics.ListAPIView):
   queryset = Users.objects.all()
   serializer_class = UserSerializer


class Register(APIView):
    serializer_class = RegisterSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            # If they don't have a session -> create one
            self.request.session.create()
            
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            dob = serializer.data.get('dob')
            user = Users(first_name=first_name, last_name=last_name, email=email, password=password, dob=dob)
            user.save()

            self.request.session['user_id'] = user.user_id
            return Response(RegisterSerializer(user).data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):
    serializer_class = LoginSerializer
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

            if user_result.exists():
                user = user_result[0]
                self.request.session['user_id'] = user.user_id
                # serializer = self.serializer_class(data=user.user_id)

                return Response(LoginSerializer(user).data, status=status.HTTP_200_OK) 
            
            return Response({"Bad Request", "Invalid Login Details"}, status=status.HTTP_400_BAD_REQUEST) 
            
        return Response({"Bad Request", "Invalid post data, did not find the email and password"}, status=status.HTTP_400_BAD_REQUEST) 


class activeSession(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):   # Checks userid in url to session
            # If they don't have a session -> create one
            self.request.session.create()
        
        data = {
            'user_id': self.request.session.get('user_id')
        }
        return JsonResponse(data, status=status.HTTP_200_OK)


class userIdValid(APIView):
    serializer_class = UserSerializer
    lookup_url_kwarg = 'user_id'
    
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            # If they don't have a session -> create one
            self.request.session.create()

        user_id = request.GET.get(self.lookup_url_kwarg)
        if (user_id != None):
            listOfUsers = Users.objects.filter(user_id=user_id)
            if listOfUsers.exists():
                data = UserSerializer(listOfUsers[0]).data
                return Response(data, status=status.HTTP_200_OK)

            return Response({"User not found": "Invalid User ID"}, status=status.HTTP_404_NOT_FOUND)
            
        return Response({'Bad Request': 'User ID paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)


class getUserHabits(APIView):
    serializer_class = UserHabitsSerializer
    lookup_url_kwarg = 'user_id'

    def get(self, request, format=None):
        # if not self.request.session.exists(self.request.session.session_key):
        #     # If they don't have an active session -> create one
        #     self.request.session.create() 
        user_id = self.request.data.get(self.lookup_url_kwarg)
        
        if user_id != None:
            listOfHabits = UserHabits.objects.filter(user_id=user_id)
            if listOfHabits.exists():
                return Response(UserHabitsSerializer(listOfHabits).data, status=status.HTTP_200_OK)
            
            # return Response({}, status=status.HTTP_)
        
        return Response({"Bad Request': 'User ID not valid"}, status=status.HTTP_400_BAD_REQUEST)




