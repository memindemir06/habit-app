# Generated by Django 3.1.4 on 2021-04-02 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0018_auto_20210331_1406'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='password',
            field=models.CharField(default='', max_length=255),
        ),
    ]
