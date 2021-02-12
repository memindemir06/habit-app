# Generated by Django 3.1.4 on 2021-02-12 13:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserFriends',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_id1', to='backend.users')),
                ('user_id2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_id2', to='backend.users')),
            ],
        ),
    ]
