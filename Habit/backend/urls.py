from django.urls import path, include
from .views import index, Login, Register, activeSession, userIdValid, getUserHabits, getUserOptionals, filterFriends, removeFriend, addFriend, getLeaderboard, removeHabit, addHabit, getAllHabits, handleCompleted, updateProfileOptionals, updateProfileRequired, updateProfileImages

urlpatterns = [
    path('users', index.as_view()),
    path('login', Login.as_view()),
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
]
