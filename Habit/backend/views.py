from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import generics, status
from .models import Users, UserHabits, Optional, UserFriends, Habits
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, UserHabitsSerializer, UserOptionalSerializer, FriendsSerializer, AllHabitsSerializer, ImageSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import FileSystemStorage 


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
            user_name = serializer.data.get('user_name')
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            dob = serializer.data.get('dob')
            user = Users(user_name=user_name ,first_name=first_name, last_name=last_name, email=email, password=password, dob=dob)
            user.save()
            
            userOptional = Optional(user_id=user_id)
            userOptional.save()

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


class Logout(APIView):
    def post(self, request, format=None): 
        del self.request.session['user_id']

        return Response({"Logged out successful"}, status=status.HTTP_200_OK)


class activeSession(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):   # Checks userid in url to session
            # If they don't have a session -> create one
            self.request.session.create()
        
        user_id = self.request.session.get('user_id')
    
        if user_id != None:
            listOfUsers = Users.objects.filter(user_id=user_id)

            if listOfUsers.exists():
                data = UserSerializer(listOfUsers[0]).data

                return Response(data, status=status.HTTP_200_OK)

            # return Response({"User created"}, status=status.HTTP_200_OK)

        return Response({"Bad Request": "No active session"}, status=status.HTTP_400_BAD_REQUEST)


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

            return Response({"User not found": "Invalid User ID"}, status=status.HTTP_400_BAD_REQUEST)
            
        return Response({'Bad Request': 'User ID paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)


# DAILY REMINDERS -----------------------------------------------------------------------------

class getUserHabits(APIView):
    serializer_class = UserHabitsSerializer(many=True)
    lookup_url_kwarg = 'user_id'
    
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            # If they don't have an active session -> create one
            self.request.session.create() 

        user_id = request.data.get(self.lookup_url_kwarg)
        
        if user_id != None:
            listOfHabits = UserHabits.objects.filter(user_id=user_id)
            if listOfHabits.exists(): 
                habitList = []
                
                for i in range(len(listOfHabits)):
                    habitList.append(UserHabitsSerializer(listOfHabits[i]).data)
                data = {'list_of_habits': habitList} 

                return JsonResponse(data, status=status.HTTP_200_OK)
        
        return Response({"Bad Request': 'User ID not valid"}, status=status.HTTP_400_BAD_REQUEST)


class getAllHabits(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            # If they don't have an active session -> create one
            self.request.session.create()
        
        listOfHabits = Habits.objects.filter()
        listOfAllHabits = []

        for habit in listOfHabits:
            listOfAllHabits.append(AllHabitsSerializer(habit).data)

        return JsonResponse({"list_of_all_habits": listOfAllHabits}, status=status.HTTP_200_OK)


class addHabit(APIView):
    lookup_url_user_id = 'user_id'
    # If habit_id can be passed from the Frontend -> use that instead of the habit_name
    lookup_url_habit_name = 'habit_name'

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            # If they don't have an active session -> create one
            self.request.session.create()
            
        user_id = request.data.get(self.lookup_url_user_id)
        habit_name = request.data.get(self.lookup_url_habit_name)

        if (user_id != None) and (habit_name != None):
            user_list = Users.objects.filter(user_id = user_id)
            habit_id_list = Habits.objects.filter(habit_name = habit_name)

            if habit_id_list.exists() and user_list.exists():
                user_instance = user_list[0]
                habit_id = habit_id_list[0]

                newHabit = UserHabits(user_id = user_instance, habit_id = habit_id)
                newHabit.save()
                return Response({"Good Request": {"Habit has been added!"}}, status=status.HTTP_200_OK)

            return Response({"Bad Request": "Wrong User Id and/or Habit Name"}, status.HTTP_400_BAD_REQUEST)
            
        return Response({"Bad Request": "User Id and/or Habit Name not found"}, status.HTTP_404_NOT_FOUND)


class removeHabit(APIView):
    lookup_url_user_id = 'user_id'
    lookup_url_habit_id = 'habit_id'

    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            # If they don't have an active session -> create one
            self.request.session.create() 
        
        user_id = request.data.get(self.lookup_url_user_id)
        habit_id = request.data.get(self.lookup_url_habit_id)
        
        if (user_id != None) and (habit_id != None):
            habit = UserHabits.objects.filter(user_id = user_id, habit_id = habit_id)
            
            if habit.exists():
                habit[0].delete()
                return Response({"Good Request": "Habit successfully deleted"}, status.HTTP_200_OK)
            
            return Response({"Bad Request": "Wrong User Id and/or Habit Id"}, status.HTTP_400_BAD_REQUEST)
        
        return Response({"Bad Request": "User Id and/or Habit Id not found"}, status.HTTP_404_NOT_FOUND)


class handleCompleted(APIView):
    serializer_class = UserHabitsSerializer
    lookup_url_user_id = 'user_id'
    lookup_url_habit_id = 'habit_id'
    lookup_url_kwarg_purpose = 'purpose'

    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            # If they don't have an active session -> create one
            self.request.session.create()
            
        user_id = request.data.get(self.lookup_url_user_id)
        habit_id = request.data.get(self.lookup_url_habit_id)
        purpose = request.data.get(self.lookup_url_kwarg_purpose)
        
        if (user_id != None) and (habit_id != None) and (purpose != None):
            habit = UserHabits.objects.filter(user_id = user_id, habit_id = habit_id)

            if habit.exists():
                if purpose == "increment":
                    streak = habit[0].streak + 1
                    habit.update(streak=streak, completed=True)
                    return Response({"Good Request": "Streak Incremented!"}, status=status.HTTP_200_OK)
                elif purpose == "decrement":
                    streak = habit[0].streak - 1
                    habit.update(streak=streak, completed=False)
                    return Response({"Good Request": "Streak Decremented!"}, status=status.HTTP_200_OK)
                
                return Response({"Bad Request": "Habit does not exist!"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"Bad Request": "User Id and/or Habit Id does not exist!"}, status=status.HTTP_400_BAD_REQUEST)


# PROFILE PAGE --------------------------------------------------------------------------------

class getUserOptionals(APIView):
    serializer_class = UserOptionalSerializer
    lookup_url_kwarg = 'user_id'

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            # If they don't have an active session -> create one
            self.request.session.create() 
        
        user_id = request.data.get(self.lookup_url_kwarg)
        
        if user_id != None:
            listOfOptionals = Optional.objects.filter(user_id=user_id)
            if listOfOptionals.exists():
                # return JsonResponse({'userOptionals': UserOptionalSerializer(listOfOptionals[0]).data}, status=status.HTTP_200_OK)
                return Response(UserOptionalSerializer(listOfOptionals[0]).data, status=status.HTTP_200_OK)
            else:
                userInstance = Users.objects.filter(user_id=user_id)
                userOptionalData = Optional(user_id=userInstance[0])
                userOptionalData.save()

                return Response(UserOptionalSerializer(userOptionalData).data, status=status.HTTP_200_OK)
            
            return Response({"Bad Request": "User ID not valid"}, status=status.HTTP_400_BAD_REQUEST)
            
        return Response({"Bad Request": "User ID not valid"}, status=status.HTTP_404_NOT_FOUND)


class updateProfileOptionals(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        posts_serializer = ImageSerializer(data=request.data)

        if posts_serializer.is_valid():
            # Required Info
            user_id = posts_serializer.data['user_id']

            # Optional Info
            description = posts_serializer.data['description'] 
            facebook = posts_serializer.data['facebook']
            instagram = posts_serializer.data['instagram']
            twitter = posts_serializer.data['twitter']
            
            userOptionalsList = Optional.objects.filter(user_id=user_id)

            if userOptionalsList.exists(): 
                userOptionalsList.update(description=description, facebook=facebook, instagram=instagram, twitter=twitter)                      

                return Response(UserOptionalSerializer(userOptionalsList[0]).data, status=status.HTTP_200_OK)

            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class updateProfileImages(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        posts_serializer = ImageSerializer(data=request.data)

        if posts_serializer.is_valid():
            # Required Info
            user_id = posts_serializer.data['user_id']
    
            userOptionalsList = Optional.objects.filter(user_id=user_id)

            if userOptionalsList.exists(): 
                    # profile_img
                profile_img_file = request.FILES.get('profile_img', False)

                if profile_img_file:
                    fs = FileSystemStorage()
                    filename = fs.save(profile_img_file.name, profile_img_file)
                    profile_img_url = fs.url(filename)
                    userOptionalsList.update(profile_img=profile_img_url)

                # background_img
                background_img_file = request.FILES.get('background_img', False)

                if background_img_file:                
                    fs = FileSystemStorage()
                    filename = fs.save(background_img_file.name, background_img_file)
                    background_img_url = fs.url(filename)
                    userOptionalsList.update(background_img=background_img_url)
    
                return Response(UserOptionalSerializer(userOptionalsList[0]).data, status=status.HTTP_200_OK)

            return Response({"Bad Request": "user has no optionals"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       

class updateProfileRequired(APIView):
    lookup_user_id = 'user_id'
    lookup_user_name = 'user_name'
    lookup_first_name = 'first_name'
    lookup_last_name = 'last_name'
    lookup_email = 'email'

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            # If they don't have an active session -> create one
            self.request.session.create() 

        user_id = request.data.get(self.lookup_user_id)
        user_name = request.data.get(self.lookup_user_name)
        email = request.data.get(self.lookup_email)
        first_name = request.data.get(self.lookup_first_name)
        last_name = request.data.get(self.lookup_last_name)
        if (user_id != None) and (user_name != None) and (email != None) and (first_name != None) and (last_name != None):
            userList = Users.objects.filter(user_id=user_id)
            if userList.exists():
 
                userList.update(user_name=user_name, email=email, first_name=first_name, last_name=last_name)
                                
                return Response(UserSerializer(userList[0]).data, status=status.HTTP_200_OK)

            return Response({"Bad Request": "User Id not valid!"}, status.HTTP_400_BAD_REQUEST)
        
        return Response({"Bad Request": "Parameters missing in Request!"}, status.HTTP_400_BAD_REQUEST)
    

class getOtherUserInfo(APIView):
    lookup_user_name = 'user_name'
    
    def get(self, request, format=None):
        user_name = request.GET.get(self.lookup_user_name)
        
        if user_name != None:
            userList = Users.objects.filter(user_name=user_name)
            if userList.exists():
                return Response(UserSerializer(userList[0]).data, status=status.HTTP_200_OK)

            return Response({"Bad Request": "Username does not exists!"}, status.HTTP_400_BAD_REQUEST)

        return Response({"Bad Request": "Username missing in Request!"}, status.HTTP_400_BAD_REQUEST)


# FRIENDS PAGE --------------------------------------------------------------------------------

class removeFriend(APIView):
    lookup_url_user_id1 = 'user_id1'
    lookup_url_user_id2 = 'user_id2'

    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            # If they don't have an active session -> create one
            self.request.session.create() 
        
        user_id1 = request.data.get(self.lookup_url_user_id1)
        user_id2 = request.data.get(self.lookup_url_user_id2)
        
        if user_id1 != None:
            friend1 = UserFriends.objects.filter(user_id1 = user_id1, user_id2 = user_id2)
            friend2 = UserFriends.objects.filter(user_id1 = user_id2, user_id2 = user_id1)

            tempList = []
            
            if friend1.exists():
                tempList.append(friend1[0])
            if friend2.exists():
                tempList.append(friend2[0])

            if len(tempList) > 0:
                tempList[0].delete()

                return Response({"Good Request": "User successfully unfriended"}, status.HTTP_200_OK)
            
            return Response({"Bad Request": "Friend does not exist!"}, status.HTTP_400_BAD_REQUEST)
        
        return Response({"Bad Request": "User Ids not found"}, status.HTTP_404_NOT_FOUND)


class addFriend(APIView):
    lookup_url_user_id = 'user_id'
    lookup_url_user_name = 'user_name'

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            # If they don't have an active session -> create one
            self.request.session.create() 
        
        user_id = request.data.get(self.lookup_url_user_id)
        user_name = request.data.get(self.lookup_url_user_name)
        
        if user_id != None and user_name != None:
            potentialFriend = Users.objects.filter(user_name=user_name)
            
            if potentialFriend.exists():
                #Add friend
                potentialFriendUserId = potentialFriend[0].user_id
                friend1 = UserFriends.objects.filter(user_id1 = user_id, user_id2 = potentialFriendUserId)
                friend2 = UserFriends.objects.filter(user_id1 = potentialFriendUserId, user_id2 = user_id)
                
                if friend1.exists() or friend2.exists():
                    return Response({"Good_Request": "Friend already exists"}, status.HTTP_200_OK)
                
                user_instance1 = Users.objects.filter(user_id = user_id)
                user_instance2 = Users.objects.filter(user_id = potentialFriendUserId)

                friend = UserFriends(user_id1 = user_instance1[0], user_id2 = user_instance2[0])  
                friend.save()

                return Response({"Good_Request": "User successfully friended"}, status.HTTP_200_OK)
                
            return Response({"Bad Request": "Friend does not exist!"}, status.HTTP_400_BAD_REQUEST)
        
        return Response({"Bad Request": "User Ids not found"}, status.HTTP_404_NOT_FOUND)


class filterFriends(APIView):
    serializer_class = FriendsSerializer
    lookup_url_kwarg = 'user_id'
    lookup_url_habit_name = 'habit_name'

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            # If they don't have an active session -> create one
            self.request.session.create() 

        user_id = request.data.get(self.lookup_url_kwarg)
        habit_name = request.data.get(self.lookup_url_habit_name)

        # This part gets the list of friends, basically getFriends class
        if user_id != None:   # No filter
            listOfFriends = []

            listOfFriends1 = UserFriends.objects.filter(user_id1 = user_id)
            listOfFriends2 = UserFriends.objects.filter(user_id2 = user_id)

            if listOfFriends1.exists(): 
                for i in range(len(listOfFriends1)):
                    friendPair = FriendsSerializer(listOfFriends1[i]).data
                    friendPair = friendPair.pop('user_id2')
                    profile_img = getUserOptionalData(friendPair['user_id'])
                    friendPair["profile_img"] = profile_img  
                    listOfFriends.append(friendPair)
            
            if listOfFriends2.exists():
                for i in range(len(listOfFriends2)):
                    friendPair = FriendsSerializer(listOfFriends2[i]).data
                    friendPair = friendPair.pop('user_id1')
                    profile_img = getUserOptionalData(friendPair['user_id'])
                    friendPair["profile_img"] = profile_img    
                    listOfFriends.append(friendPair)

            if habit_name == "No_Filter":         
                data = {
                    'list_of_friends': listOfFriends,
                }

                return JsonResponse(data, status=status.HTTP_200_OK)
            else:
                # This part filters the list of friends by habit
                listOfFilteredFriends = []
                habit_id = Habits.objects.filter(habit_name = habit_name)
                if habit_id != None:
                    habit_id = habit_id[0].habit_id # Gets habit id from habit name

                    for friend in listOfFriends: 
                        tempuser_id = friend["user_id"]
                        habitExist = UserHabits.objects.filter(user_id = tempuser_id, habit_id = habit_id) # Filters by friend and habit
                        if habitExist.exists():
                            listOfFilteredFriends.append(friend) # Adds to filtered friends list if habit is found
                    
                    data = {
                        'list_of_friends': listOfFilteredFriends,
                    }

                    return JsonResponse(data, status=status.HTTP_200_OK)

                return Response({"Bad Request": "Habit Name not valid"}, status=status.HTTP_404_NOT_FOUND) 
            
        else:
            return Response({"Bad Request": "User ID not valid"}, status=status.HTTP_404_NOT_FOUND) 


# LEADERBOARD ---------------------------------------------------------------------------------


def getUserOptionalData(user_id):
    userOptionalList = Optional.objects.filter(user_id=user_id)

    if userOptionalList.exists():
        data = UserOptionalSerializer(userOptionalList[0]).data
        return data['profile_img']


class getLeaderboard(APIView):
    #serializer_class = UserHabitsSerializer
    lookup_url_purpose = 'purpose' 
    lookup_url_user_id = 'user_id'
    
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            # If they don't have an active session -> create one
            self.request.session.create() 
        
        user_id = request.data.get(self.lookup_url_user_id) 
        purpose = request.data.get(self.lookup_url_purpose) 

        if purpose != None:
            arrayOfHabits = []

            if purpose == "No_Filter":
                listOfHabits = UserHabits.objects.order_by('-streak', 'user_id__user_name') 
                
                if listOfHabits.exists():
                    for habit in listOfHabits: 
                        data = UserHabitsSerializer(habit).data
                        profile_img = getUserOptionalData(data['user_id']["user_id"])
                        data["profile_img"] = profile_img
                        arrayOfHabits.append(data)
                        
                    data = {"user_habits": arrayOfHabits}

                    return JsonResponse(data, status=status.HTTP_200_OK)

                return Response({"Bad Request": "habits does not exist"}, status=status.HTTP_404_NOT_FOUND)

            
            elif purpose == "Friends":
                if user_id != None:
                    friendQuery1 = UserFriends.objects.filter(user_id1=user_id)
                    friendQuery2 = UserFriends.objects.filter(user_id2=user_id)

                    listOfFriends = []

                    if friendQuery1.exists():
                        for friend in friendQuery1:
                            friendPair = FriendsSerializer(friend).data
                            friendPair = friendPair.pop('user_id2')
                            listOfFriends.append(friendPair)

                    if friendQuery2.exists():
                        for friend in friendQuery2:
                            friendPair = FriendsSerializer(friend).data
                            friendPair = friendPair.pop('user_id1')
                            listOfFriends.append(friendPair)

                    for friend in listOfFriends:
                        user_id = friend["user_id"]
                        friendHabits = UserHabits.objects.filter(user_id=user_id)

                        if friendHabits.exists():
                            for habit in friendHabits:
                                data = UserHabitsSerializer(habit).data
                                profile_img = getUserOptionalData(data['user_id']["user_id"])
                                data["profile_img"] = profile_img
                                arrayOfHabits.append(data)
                    
                    arrayOfHabits.sort(key=lambda x: (-x['streak'], x['user_id']['user_name']))

                    data = {"user_habits": arrayOfHabits} 

                    return JsonResponse(data, status=status.HTTP_200_OK)
                    
                return Response({"Bad Request": "User id does not exist"}, status=status.HTTP_404_NOT_FOUND)
            else:
                habit_id = Habits.objects.filter(habit_name = purpose)
                
                if habit_id.exists():
                    habit_id = habit_id[0].habit_id
                    listOfHabits = UserHabits.objects.filter(habit_id=habit_id).order_by('-streak', 'user_id__user_name')

                    if listOfHabits.exists():
                        for habit in listOfHabits: 
                            data = UserHabitsSerializer(habit).data
                            profile_img = getUserOptionalData(data['user_id']["user_id"])
                            data["profile_img"] = profile_img
                            arrayOfHabits.append(data) 

                        data = {"user_habits": arrayOfHabits}

                        return JsonResponse(data, status=status.HTTP_200_OK)
                    
                    return Response({"Bad Request": "habits does not exist"}, status=status.HTTP_404_NOT_FOUND)
                
                return Response({"Bad Request": "habit id not valid"}, status=status.HTTP_404_NOT_FOUND)

            return Response({"Bad Request": "Invalid Parameter"}, status=status.HTTP_404_NOT_FOUND) 

        return Response({"Bad Request": "No Parameter found"}, status=status.HTTP_404_NOT_FOUND) 


# MAP PAGE ------------------------------------------------------------------------------------

class updateLocation(APIView):
    lookup_url_user_id = 'user_id'
    lookup_url_location = 'location'
    
    def post(self, request, format=None):
        user_id = request.data.get(self.lookup_url_user_id) 
        location = request.data.get(self.lookup_url_location) 
        
        if user_id != None and location != None:
            listOfUsers = Optional.objects.filter(user_id=user_id)
            
            if listOfUsers.exists():
                listOfUsers.update(location=location)

                return Response({"Good Request": "Location Added"}, status=status.HTTP_200_OK)
        
            return Response({"Bad Request": "User ID not valid"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"Bad Request": "User ID not found"}, status=status.HTTP_404_NOT_FOUND) 


class updatePermission(APIView):
    lookup_url_user_id = 'user_id'
    lookup_url_access_permission = 'access_permission' 

    def post(self, request, format=None):
        user_id = request.data.get(self.lookup_url_user_id) 
        access_permission = request.data.get(self.lookup_url_access_permission) 
        
        if user_id != None and access_permission != None:
            listOfUsers = Optional.objects.filter(user_id=user_id)
            
            if listOfUsers.exists():
                listOfUsers.update(access_permission=access_permission)

                return Response({"Good Request": "Permission Updated"}, status=status.HTTP_200_OK)
        
            return Response({"Bad Request": "User ID not valid"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"Bad Request": "User ID not found"}, status=status.HTTP_404_NOT_FOUND) 


def getFriendsList(user_id):    # returns friends' user ids
    listOfFriends = []

    listOfFriends1 = UserFriends.objects.filter(user_id1 = user_id)
    listOfFriends2 = UserFriends.objects.filter(user_id2 = user_id)

    if listOfFriends1.exists(): 
        for i in range(len(listOfFriends1)):
            friendPair = FriendsSerializer(listOfFriends1[i]).data 
            friendPair = friendPair.pop('user_id2')
            listOfFriends.append(friendPair)

    if listOfFriends2.exists(): 
        for i in range(len(listOfFriends2)):
            friendPair = FriendsSerializer(listOfFriends2[i]).data 
            friendPair = friendPair.pop('user_id1')
            listOfFriends.append(friendPair)

    return listOfFriends


def getFriendsOptionalData(friendList):
    listOfOptionalData = [] 

    for friend in friendList:
        data = Optional.objects.filter(user_id=friend['user_id'])
        if data.exists():
            listOfOptionalData.append(UserOptionalSerializer(data[0]).data)
    
    return listOfOptionalData
        

class getLocations(APIView):
    lookup_url_user_id = 'user_id'
    lookup_url_filterChoice = 'filter'

    def post(self, request, format=None):
        user_id = request.data.get(self.lookup_url_user_id) 
        filterChoice = request.data.get(self.lookup_url_filterChoice) 
        
        if user_id != None and filterChoice != None:
            returnList = []
            friendList = getFriendsList(user_id)
            listOfOptionalData = getFriendsOptionalData(friendList)

            # No Filter -> all users with permission=public && friends with permission=friends
            # Friends -> all friends with permission = (public || friends) 
            if filterChoice == "No Filter" or filterChoice == "Friends":
                publicFriendsOptionalData = []

                for friend in listOfOptionalData:
                    if friend['access_permission'] == 'friends':
                        returnList.append(friend)
                    elif friend['access_permission'] == 'public':
                        publicFriendsOptionalData.append(friend)
            
                if filterChoice == "No Filter":
                    listOfUsers = Optional.objects.exclude(user_id=user_id).filter(access_permission="public")

                    for user in listOfUsers:
                        userData = UserOptionalSerializer(user).data
                        returnList.append(userData) 

                # else if filterChoice == "Friends" -> filter through friend by permission == "public" 
                else:
                    returnList = returnList + publicFriendsOptionalData

                return JsonResponse({"data": returnList}, status=status.HTTP_200_OK)
            # else:
            #     # Filter by Habit 
            #     habit = filterChoice 

            #     # Query all users with that habit with permission=public 
            #     listOfUsers = Optional.objects.exclude(user_id=user_id).filter(permission="public")  # public people
            #     # Query all friends with permission=friend -> filter ones with habit 
                
        return Response({"Bad Request": "User ID not found"}, status=status.HTTP_404_NOT_FOUND) 



class getUserLocation(APIView):
    lookup_url_user_id = 'user_id'

    def post(self, request, format=None):
        user_id = request.data.get(self.lookup_url_user_id) 

        if user_id != None:
            userLocationList = Optional.objects.filter(user_id=user_id)
            
            if userLocationList.exists():
                userLocation = UserOptionalSerializer(userLocationList[0]).data  
                return Response(userLocation, status.HTTP_200_OK)

            return Response({"OK Request": "User has no location"}, status=status.HTTP_200_OK) 
            
        return Response({"Bad Request": "User ID not found"}, status=status.HTTP_404_NOT_FOUND) 

