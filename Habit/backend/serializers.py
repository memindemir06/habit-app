from rest_framework import serializers
from .models import Users, UserHabits, Optional, UserFriends, Habits


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('user_id', 'user_name', 'first_name', 'last_name', 'dob', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('user_id', 'user_name', 'first_name', 'last_name', 'email', 'password', 'dob')
        
        
class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('user_id', 'user_name', 'email', 'password')

class HabitsSerializer(serializers.ModelSerializer):
        class Meta:
            model = Habits
            fields = '__all__'


class UserHabitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserHabits
        depth = 1 # To get foreign key data
        fields = ('user_id', 'habit_id', 'streak', 'start_date', 'completed') # Got rid of user_id, dont need it
        

class UserOptionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Optional
        depth = 1
        fields = '__all__' #('user_id', 'phone_number', 'description', 'facebook', 'instagram', 'twitter', 'profile_img',  'background_img', 'location', 'access_permissions')
        

class FriendsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFriends
        depth = 1
        fields = ('user_id1', 'user_id2')


class AllHabitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habits
        fields = ('habit_id', 'habit_name')


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Optional
        fields = ('user_id', 'phone_number', 'description', 'facebook', 'instagram', 'twitter')

