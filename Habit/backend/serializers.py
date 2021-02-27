from rest_framework import serializers
from .models import Users, UserHabits, Optional, UserFriends


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
        
class UserOptionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Optional
        fields = ('phone_number', 'description', 'facebook', 'instagram', 'twitter')
        
class FriendsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFriends
        depth = 1
        fields = ('user_id1', 'user_id2')
