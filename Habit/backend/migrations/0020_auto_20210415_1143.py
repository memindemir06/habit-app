# Generated by Django 3.1.4 on 2021-04-15 11:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0019_auto_20210402_1326'),
    ]

    operations = [
        migrations.AlterField(
            model_name='optional',
            name='profile_img',
            field=models.ImageField(blank=True, default='/default_profile_img.jpeg', null=True, upload_to='gallery'),
        ),
    ]
