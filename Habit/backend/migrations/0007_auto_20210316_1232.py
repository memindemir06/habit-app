# Generated by Django 3.1.4 on 2021-03-16 12:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_auto_20210313_1805'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userhabits',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to='backend.users'),
        ),
    ]
