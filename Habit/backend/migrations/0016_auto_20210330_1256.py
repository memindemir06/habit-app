# Generated by Django 3.1.4 on 2021-03-30 12:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0015_auto_20210325_1346'),
    ]

    operations = [
        migrations.AddField(
            model_name='optional',
            name='location',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='optional',
            name='permission',
            field=models.CharField(default='private', max_length=15),
        ),
    ]