from django.urls import path
from .views import index, Login, Logout, Register, activeSession, userIdValid, getUserHabits, getUserOptionals, filterFriends, removeFriend, addFriend, getLeaderboard, removeHabit, addHabit, getAllHabits, handleCompleted, updateProfileOptionals, updateProfileRequired, updateProfileImages, getOtherUserInfo, updateLocation, updatePermission, getLocations, getUserLocation, checkIsFriend


urlpatterns = [
    path('users', index.as_view()),
    path('login', Login.as_view()),
    path('logout', Logout.as_view()),
    path('register', Register.as_view()),
    path('activeSession', activeSession.as_view()),
    path('userIdValid', userIdValid.as_view()),
    path('getUserHabits', getUserHabits.as_view()),
    path('getUserOptionals', getUserOptionals.as_view()),
    path('filterFriends', filterFriends.as_view()),
    path('getLeaderboard', getLeaderboard.as_view()),
    path('removeHabit', removeHabit.as_view()),
    path('addHabit', addHabit.as_view()),
    path('getAllHabits', getAllHabits.as_view()),
    path('removeFriend', removeFriend.as_view()),
    path('addFriend', addFriend.as_view()),
    path('handleCompleted', handleCompleted.as_view()),
    path('updateProfileOptionals', updateProfileOptionals.as_view()),
    path('updateProfileRequired', updateProfileRequired.as_view()),
    path('updateProfileImage', updateProfileImages.as_view()),
    path('getOtherUserInfo', getOtherUserInfo.as_view()),
    path('updateLocation', updateLocation.as_view()),
    path('updatePermission', updatePermission.as_view()),
    path('getLocations', getLocations.as_view()),
    path('getUserLocation', getUserLocation.as_view()),
    path('checkIsFriend', checkIsFriend.as_view()),
]
