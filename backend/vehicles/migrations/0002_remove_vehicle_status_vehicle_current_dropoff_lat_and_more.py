# Generated by Django 5.0.1 on 2024-10-27 23:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vehicles', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vehicle',
            name='status',
        ),
        migrations.AddField(
            model_name='vehicle',
            name='current_dropoff_lat',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='vehicle',
            name='current_dropoff_lng',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='vehicle',
            name='current_pickup_lat',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='vehicle',
            name='current_pickup_lng',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='vehicle',
            name='state',
            field=models.CharField(choices=[('DOCKED', 'Docked at depot'), ('EN_ROUTE_TO_PICKUP', 'En route to pickup'), ('AWAITING_PASSENGER', 'Awaiting passenger'), ('IN_RIDE', 'In ride'), ('RETURNING', 'Returning to depot')], default='DOCKED', max_length=20),
        ),
    ]
