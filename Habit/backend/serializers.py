from rest_framework import serializers
from .models import Users, UserHabits


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('user_id', 'first_name', 'last_name', 'dob', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('user_id', 'first_name', 'last_name', 'email', 'password', 'dob')
        
        
class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('user_id', 'first_name', 'last_name', 'email', 'password', 'dob')


class UserHabitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserHabits
        depth = 1 # To get foreign key data
        fields = ('habit_id', 'streak', 'start_date') # Got rid of user_id, dont need it
        # fields = ([])

