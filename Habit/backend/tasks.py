from celery.schedules import crontab
from celery.task import periodic_task
from .models import UserHabits


@periodic_task(run_every=crontab(hour=14, minute=12))
def handleUserHabitReset():
    listOfUserHabits = UserHabits.objects.all()

    if listOfUserHabits.exists():
        for userHabit in listOfUserHabits:
            if userHabit.completed:
                userHabit.update(completed=False) 
            else:
                userHabit.update(streak=0) 

