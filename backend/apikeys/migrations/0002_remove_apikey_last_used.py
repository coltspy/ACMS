# Generated by Django 5.0.1 on 2024-11-01 07:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apikeys', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='apikey',
            name='last_used',
        ),
    ]