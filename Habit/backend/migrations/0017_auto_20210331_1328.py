# Generated by Django 3.1.4 on 2021-03-31 13:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0016_auto_20210330_1256'),
    ]

    operations = [
        migrations.RenameField(
            model_name='optional',
            old_name='permission',
            new_name='access_permission',
        ),
    ]
