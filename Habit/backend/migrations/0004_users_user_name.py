# Generated by Django 3.1.6 on 2021-03-09 12:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_users_password'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='user_name',
            field=models.CharField(default='Test', max_length=20),
        ),
    ]
