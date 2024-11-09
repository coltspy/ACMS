'use client'
import { useState, useEffect } from 'react'
import { Map, Marker } from 'pigeon-maps'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
interface Vehicle {
  id: number
  name: string
  latitude: number
  longitude: number
  battery_level: number
  status: VehicleStatus
}

type VehicleStatus = 'active' | 'charging' | 'maintenance' | 'offline'

const ClientSideMap = () => {
  const [mounted, setMounted] = useState(false)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)

  const SF_CENTER: [number, number] = [37.7749, -122.4194]
  const CHARGING_STATIONS = [
    { id: 1, name: "Downtown Station", latitude: 37.7749, longitude: -122.4194 },
    { id: 2, name: "Marina Station", latitude: 37.7850, longitude: -122.4344 },
    { id: 3, name: "Mission Station", latitude: 37.7600, longitude: -122.4100 },
  ]

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch vehicles after mounting
  useEffect(() => {
    if (!mounted) return

    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/vehicles/')
        const initializedVehicles = response.data.map((vehicle: Vehicle) => ({
          ...vehicle,
          latitude: SF_CENTER[0] + (Math.random() - 0.5) * 0.02,
          longitude: SF_CENTER[1] + (Math.random() - 0.5) * 0.02,
        }))
        setVehicles(initializedVehicles)
      } catch (err) {
        console.error('Error fetching vehicles:', err)
      }
    }

    fetchVehicles()
  }, [mounted, SF_CENTER])

  // Vehicle movement simulation
  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setVehicles(currentVehicles => 
        currentVehicles.map(vehicle => {
          if (vehicle.status === 'charging') return vehicle

          const newBattery = Math.max(0, vehicle.battery_level - 0.05)
          
          // Need charging
          if (newBattery < 20) {
            const station = CHARGING_STATIONS[0]
            return {
              ...vehicle,
              status: 'charging',
              latitude: station.latitude,
              longitude: station.longitude,
              battery_level: newBattery
            }
          }

          // Regular movement
          return {
            ...vehicle,
            latitude: vehicle.latitude + (Math.random() - 0.5) * 0.0001,
            longitude: vehicle.longitude + (Math.random() - 0.5) * 0.0001,
            battery_level: newBattery
          }
        })
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [mounted, CHARGING_STATIONS])

  if (!mounted) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Vehicle List */}
      <div className="col-span-1 space-y-4">
        <h2 className="text-xl font-semibold">Vehicles</h2>
        {vehicles.map((vehicle) => (
          <div 
            key={vehicle.id}
            className="p-4 border rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedVehicle(vehicle)}
          >
            <h3 className="font-medium">{vehicle.name}</h3>
            <div className="text-sm mt-2 space-y-1">
              <p>Status: 
                <span className={`font-medium ml-1 ${
                  vehicle.status === 'active' ? 'text-green-600' :
                  vehicle.status === 'charging' ? 'text-blue-600' :
                  vehicle.status === 'maintenance' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {vehicle.status}
                </span>
              </p>
              <p>Battery: 
                <span className={`font-medium ml-1 ${
                  vehicle.battery_level < 20 ? 'text-red-600' : 
                  vehicle.battery_level < 50 ? 'text-yellow-600' : 
                  'text-green-600'
                }`}>
                  {vehicle.battery_level.toFixed(1)}%
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="col-span-1 md:col-span-3">
        <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg">
          <Map 
            height={600}
            defaultCenter={SF_CENTER}
            defaultZoom={13}
          >
            {CHARGING_STATIONS.map((station) => (
              <Marker
                key={`station-${station.id}`}
                width={50}
                color="#000000"
                anchor={[station.latitude, station.longitude]}
              />
            ))}

            {vehicles.map((vehicle) => (
              <Marker
                key={vehicle.id}
                width={50}
                color={vehicle.status === 'active' ? '#22c55e' :
                       vehicle.status === 'charging' ? '#3b82f6' :
                       vehicle.status === 'maintenance' ? '#eab308' :
                       '#ef4444'}
                anchor={[vehicle.latitude, vehicle.longitude]}
                onClick={() => setSelectedVehicle(vehicle)}
              />
            ))}
          </Map>
        </div>
      </div>

      {selectedVehicle && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg z-10">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{selectedVehicle.name}</h3>
              <p>Status: {selectedVehicle.status}</p>
              <p>Battery: {selectedVehicle.battery_level.toFixed(1)}%</p>
            </div>
            <button 
              onClick={() => setSelectedVehicle(null)}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function VehicleMap() {
  return <ClientSideMap />
}