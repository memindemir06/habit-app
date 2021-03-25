from django.db import models
import random
import string


DATE_INPUT_FORMATS = ['%d-%m-%Y']

def generate_unique_code():
    length = 6
    while True:
        # Generates random string consisting only of ASCII Upper-Case letters
        user_id = ''.join(random.choices(string.ascii_uppercase, k=length))
        # CHECK IF UNQIUE | Room.object -> all rooms created | If no. of rooms that have same code == 0
        if (Users.objects.filter(user_id=user_id)).count() == 0:
            break
    return user_id


class Users(models.Model):
    user_id = models.CharField(max_length=6, default=generate_unique_code, unique=True, primary_key=True)
    user_name = models.CharField(max_length=25, default="Test")
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25) 
    email = models.EmailField(max_length=254)
    password = models.CharField(max_length=30, default="")
    dob = models.CharField(max_length=20)
    ordering = ['user_name']
    # verified = models.BooleanField()


class Optional(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15, null=True)
    description = models.CharField(max_length=200, null=True)
    facebook = models.CharField(max_length=100, null=True, default="https://www.facebook.com/") 
    instagram = models.CharField(max_length=100, null=True, default="https://www.instagram.com/")
    twitter = models.CharField(max_length=100, null=True, default="https://twitter.com/")
    profile_img = models.ImageField(upload_to="gallery", null=True, default="/boris.webp")
    background_img = models.ImageField(upload_to="gallery", null=True, default="/default_background.jpeg")
    # location = models.CharField(max_length=20, null=True)


class Habits(models.Model):
    habit_id = models.AutoField(primary_key=True)
    habit_name = models.CharField(max_length=15, unique=True)


class UserHabits(models.Model): 
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    habit_id = models.ForeignKey(Habits, on_delete=models.CASCADE)
    streak = models.IntegerField(default=0) 
    start_date = models.DateTimeField(auto_now_add=True) 
    completed = models.BooleanField(default=False) 


class UserFriends(models.Model):
    user_id1 = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='user_id1')
    user_id2 = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='user_id2')


