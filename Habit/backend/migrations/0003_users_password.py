# Generated by Django 3.1.4 on 2021-02-13 12:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_userfriends'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='password',
            field=models.CharField(default='', max_length=30),
        ),
    ]
