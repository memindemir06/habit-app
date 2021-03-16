from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import generics, status
from .models import Users, UserHabits, Optional, UserFriends, Habits
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, UserHabitsSerializer, UserOptionalSerializer, FriendsSerializer, AllHabitsSerializer


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
            
            return Response({"Bad Request": "User ID not valid"}, status=status.HTTP_400_BAD_REQUEST)
            
        return Response({"Bad Request": "User ID not valid"}, status=status.HTTP_404_NOT_FOUND)


class updateProfile(APIView):
    serializer_class = UserOptionalSerializer
    lookup_user_id = 'user_id'
    lookup_user_name = 'user_name'
    lookup_first_name = 'first_name'
    lookup_last_name = 'last_name'
    lookup_email = 'email'
    lookup_description = 'description'
    lookup_facebook = 'facebook'
    lookup_instagram = 'instagram'
    lookup_twitter = 'twitter'

    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            # If they don't have an active session -> create one
            self.request.session.create() 

        user_id = request.data.get(self.lookup_user_id)
        user_name = request.data.get(self.lookup_user_name)
        email = request.data.get(self.lookup_email)
        first_name = request.data.get(self.lookup_first_name)
        last_name = request.data.get(self.lookup_last_name)
        description = request.data.get(self.lookup_description)
        facebook = request.data.get(self.lookup_facebook)
        instagram = request.data.get(self.lookup_instagram)
        twitter = request.data.get(self.lookup_twitter)

        if (user_id != None) and (user_name != None) and (email != None) and (first_name != None) and (last_name != None) and (description != None) and (facebook != None) and (instagram != None) and (twitter != None):
            userList = Users.objects.filter(user_id=user_id)
            if userList.exists():
                # user = userList[0]
                # user.update(user_name=user_name, email=email, first_name=first_name, last_name=last_name)
                userList.update(user_name=user_name, email=email, first_name=first_name, last_name=last_name)
            
            userOptionalsList = Optional.objects.filter(user_id=user_id)
            if userOptionalsList.exists():
                # userOptionals = userOptionalsList[0]
                # userOptionals.update(description=description, facebook=facebook, instagram=instagram, twitter=twitter)
                userOptionalsList.update(description=description, facebook=facebook, instagram=instagram, twitter=twitter)

                return Response(UserOptionalSerializer(userOptionalsList[0]).data, status=status.HTTP_200_OK)

            return Response({"Bad Request": "User Id not valid!"}, status.HTTP_400_BAD_REQUEST)
        
        return Response({"Bad Request": "Parameters missing in Request!"}, status.HTTP_400_BAD_REQUEST)
        

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
        listOfFriends = []

        # This part gets the list of friends, basically getFriends class
        if user_id != None:   # No filter
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

            if habit_name == "No Filter":         
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
            if purpose == "No Filter":
                listOfHabits = UserHabits.objects.order_by('-streak', 'user_id__user_name') 
                
                if listOfHabits.exists():
                    for habit in listOfHabits: 
                        arrayOfHabits.append(UserHabitsSerializer(habit).data) 

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
                                
                                arrayOfHabits.append(UserHabitsSerializer(habit).data)
                    
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
                            arrayOfHabits.append(UserHabitsSerializer(habit).data) 

                        data = {"user_habits": arrayOfHabits}

                        return JsonResponse(data, status=status.HTTP_200_OK)
                    
                    return Response({"Bad Request": "habits does not exist"}, status=status.HTTP_404_NOT_FOUND)
                
                return Response({"Bad Request": "habit id not valid"}, status=status.HTTP_404_NOT_FOUND)

            return Response({"Bad Request": "Invalid Parameter"}, status=status.HTTP_404_NOT_FOUND) 

        return Response({"Bad Request": "No Parameter found"}, status=status.HTTP_404_NOT_FOUND) 
        


# MAP PAGE ------------------------------------------------------------------------------------

    


