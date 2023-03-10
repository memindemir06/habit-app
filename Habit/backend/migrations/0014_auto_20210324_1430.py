# Generated by Django 3.1.4 on 2021-03-24 14:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0013_auto_20210321_1400'),
    ]

    operations = [
        migrations.AlterField(
            model_name='optional',
            name='background_img',
            field=models.ImageField(default='/default_background.jpeg', null=True, upload_to='gallery'),
        ),
        migrations.AlterField(
            model_name='optional',
            name='profile_img',
            field=models.ImageField(default='/boris.webp', null=True, upload_to='gallery'),
        ),
    ]
