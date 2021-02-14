from rest_framework import serializers
from .models import Users


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('user_id', 'first_name', 'last_name', 'dob', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('first_name', 'last_name', 'email', 'password', 'dob')
        

        
class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('user_id')


