# Generated by Django 3.1.4 on 2021-03-10 12:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_users_user_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='userhabits',
            name='completed',
            field=models.BooleanField(default=False),
        ),
    ]
