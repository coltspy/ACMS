'use client'
import { useState, useEffect } from 'react'
import { Map, Marker } from 'pigeon-maps'

type VehicleState = 'DOCKED' | 'EN_ROUTE_TO_PICKUP' | 'AWAITING_PASSENGER' | 'IN_RIDE' | 'RETURNING'

interface Vehicle {
  id: number
  name: string
  latitude: number
  longitude: number
  state: VehicleState
  battery_level: number
}

interface RideRequest {
  pickup?: [number, number]
  dropoff?: [number, number]
}

const DEPOT_LOCATION = {
  name: "SF Downtown Depot",
  latitude: 37.7749,
  longitude: -122.4194
}

const MOVEMENT_SPEED = 0.0001
const UPDATE_INTERVAL = 50

// Helper to calculate distance between two points
const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

export default function DynamicContent() {
  const [vehicle, setVehicle] = useState<Vehicle>({
    id: 1,
    name: "AV-001",
    latitude: DEPOT_LOCATION.latitude,
    longitude: DEPOT_LOCATION.longitude,
    state: 'DOCKED',
    battery_level: 100
  })

  const [rideRequest, setRideRequest] = useState<RideRequest>({})
  const [requestState, setRequestState] = useState<'PICKUP' | 'DROPOFF' | null>(null)
  const [path, setPath] = useState<[number, number][]>([])

  // Movement logic
useEffect(() => {
  if (vehicle.state === 'DOCKED') {
    // Charge when docked
    const chargingInterval = setInterval(() => {
      setVehicle(currentVehicle => ({
        ...currentVehicle,
        battery_level: Math.min(100, currentVehicle.battery_level + 0.1)
      }))
    }, UPDATE_INTERVAL)
    return () => clearInterval(chargingInterval)
  }

  if (vehicle.state === 'AWAITING_PASSENGER') return

  const interval = setInterval(() => {
    setVehicle(currentVehicle => {
      // Get target location based on state
      let targetLocation: { latitude: number; longitude: number }
      
      switch (currentVehicle.state) {
        case 'EN_ROUTE_TO_PICKUP':
          if (!rideRequest.pickup) return currentVehicle
          targetLocation = {
            latitude: rideRequest.pickup[0],
            longitude: rideRequest.pickup[1]
          }
          break
          
        case 'IN_RIDE':
          if (!rideRequest.dropoff) return currentVehicle
          targetLocation = {
            latitude: rideRequest.dropoff[0],
            longitude: rideRequest.dropoff[1]
          }
          break
          
        case 'RETURNING':
          targetLocation = DEPOT_LOCATION
          break
          
        default:
          return currentVehicle
      }

      // Calculate distance to target
      const dx = targetLocation.longitude - currentVehicle.longitude
      const dy = targetLocation.latitude - currentVehicle.latitude
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Check if we've reached the target
      if (distance < MOVEMENT_SPEED) {
        switch (currentVehicle.state) {
          case 'EN_ROUTE_TO_PICKUP':
            setTimeout(() => {
              setVehicle(prev => ({
                ...prev,
                state: 'IN_RIDE'
              }))
            }, 2000)
            return {
              ...currentVehicle,
              state: 'AWAITING_PASSENGER',
              latitude: targetLocation.latitude,
              longitude: targetLocation.longitude
            }
            
          case 'IN_RIDE':
            setPath([])
            return {
              ...currentVehicle,
              state: 'RETURNING',
              latitude: targetLocation.latitude,
              longitude: targetLocation.longitude
            }
            
          case 'RETURNING':
            setRideRequest({})
            return {
              ...currentVehicle,
              state: 'DOCKED',
              latitude: targetLocation.latitude,
              longitude: targetLocation.longitude
            }
            
          default:
            return currentVehicle
        }
      }

      // Move towards target and drain battery
      const ratio = MOVEMENT_SPEED / distance
      return {
        ...currentVehicle,
        latitude: currentVehicle.latitude + dy * ratio,
        longitude: currentVehicle.longitude + dx * ratio,
        battery_level: Math.max(0, currentVehicle.battery_level - (
          currentVehicle.state === 'IN_RIDE' ? 0.02 : // More drain with passenger
          0.01 // Normal movement drain
        ))
      }
    })
  }, UPDATE_INTERVAL)

  return () => clearInterval(interval)
}, [vehicle.state, rideRequest])

  // Path tracking
  useEffect(() => {
    if (vehicle.state !== 'DOCKED') {
      setPath(current => [...current, [vehicle.latitude, vehicle.longitude]])
    }
  }, [vehicle.latitude, vehicle.longitude, vehicle.state])

  const startRideRequest = () => {
    setRequestState('PICKUP')
    setRideRequest({})
    setPath([])
  }

  const handleMapClick = (event: { latLng: [number, number] }) => {
    if (!requestState) return

    if (requestState === 'PICKUP') {
      setRideRequest(prev => ({ ...prev, pickup: event.latLng }))
      setRequestState('DROPOFF')
    } else if (requestState === 'DROPOFF') {
      setRideRequest(prev => ({ ...prev, dropoff: event.latLng }))
      setRequestState(null)
      setVehicle(prev => ({ ...prev, state: 'EN_ROUTE_TO_PICKUP' }))
    }
  }

  // Calculate current relevant distance
  const getCurrentDistance = (): string => {
    if (!rideRequest.pickup) return '0.00'
    
    let distance: number
    switch (vehicle.state) {
      case 'EN_ROUTE_TO_PICKUP':
        distance = calculateDistance(
          vehicle.latitude,
          vehicle.longitude,
          rideRequest.pickup[0],
          rideRequest.pickup[1]
        )
        break
      case 'IN_RIDE':
        if (!rideRequest.dropoff) return '0.00'
        distance = calculateDistance(
          vehicle.latitude,
          vehicle.longitude,
          rideRequest.dropoff[0],
          rideRequest.dropoff[1]
        )
        break
      case 'RETURNING':
        distance = calculateDistance(
          vehicle.latitude,
          vehicle.longitude,
          DEPOT_LOCATION.latitude,
          DEPOT_LOCATION.longitude
        )
        break
      default:
        distance = 0
    }
    return distance.toFixed(2)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Autonomous Ride Service</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Enhanced Status Cards */}
        <div className="col-span-1 space-y-4">
          {/* Vehicle Status Card */}
          <div className="p-4 border rounded-lg shadow bg-white">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              🚗 Vehicle Status
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Vehicle ID</span>
                <span className="font-medium">{vehicle.name}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Status</span>
                <span className={`font-medium ${
                  vehicle.state === 'DOCKED' ? 'text-green-600' :
                  vehicle.state === 'EN_ROUTE_TO_PICKUP' ? 'text-blue-600' :
                  vehicle.state === 'AWAITING_PASSENGER' ? 'text-yellow-600' :
                  vehicle.state === 'IN_RIDE' ? 'text-purple-600' :
                  'text-gray-600'
                }`}>
                  {vehicle.state.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Battery Level</span>
                <div className="flex items-center">
                  <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                    <div 
                      className={`h-full rounded-full ${
                        vehicle.battery_level > 60 ? 'bg-green-500' :
                        vehicle.battery_level > 20 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${vehicle.battery_level}%` }}
                    ></div>
                  </div>
                  <span className="font-medium">{vehicle.battery_level}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Current Location</span>
                <span className="font-medium">
                  {vehicle.latitude.toFixed(4)}, {vehicle.longitude.toFixed(4)}
                </span>
              </div>
              {vehicle.state !== 'DOCKED' && (
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-gray-600">Distance to Target</span>
                  <span className="font-medium">{getCurrentDistance()} km</span>
                </div>
              )}
            </div>
          </div>

          {/* Active Ride Card */}
          <div className="p-4 border rounded-lg shadow bg-white">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              🎯 Active Ride
            </h2>
            {vehicle.state !== 'DOCKED' ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-gray-600">Ride Phase</span>
                  <span className="font-medium">
                    {vehicle.state === 'EN_ROUTE_TO_PICKUP' ? 'Heading to pickup' :
                     vehicle.state === 'AWAITING_PASSENGER' ? 'Waiting for passenger' :
                     vehicle.state === 'IN_RIDE' ? 'En route to destination' :
                     vehicle.state === 'RETURNING' ? 'Returning to depot' : 'N/A'}
                  </span>
                </div>
                {rideRequest.pickup && (
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">Pickup Location</span>
                    <span className="font-medium">
                      {rideRequest.pickup[0].toFixed(4)}, {rideRequest.pickup[1].toFixed(4)}
                    </span>
                  </div>
                )}
                {rideRequest.dropoff && (
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">Dropoff Location</span>
                    <span className="font-medium">
                      {rideRequest.dropoff[0].toFixed(4)}, {rideRequest.dropoff[1].toFixed(4)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-gray-600">Ride Progress</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ 
                          width: `${
                            vehicle.state === 'EN_ROUTE_TO_PICKUP' ? '25%' :
                            vehicle.state === 'AWAITING_PASSENGER' ? '50%' :
                            vehicle.state === 'IN_RIDE' ? '75%' :
                            vehicle.state === 'RETURNING' ? '90%' : '0%'
                          }`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No active ride
              </div>
            )}
          </div>

          {/* Ride Request Button */}
          <div className="p-4 border rounded-lg shadow bg-white">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              🚦 Request Controls
            </h2>
            <button
              onClick={startRideRequest}
              disabled={vehicle.state !== 'DOCKED'}
              className={`w-full py-3 px-4 rounded-lg ${
                vehicle.state === 'DOCKED'
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-500 cursor-not-allowed'
              }`}
            >
              {requestState === 'PICKUP' ? '📍 Select Pickup Point' :
               requestState === 'DROPOFF' ? '🎯 Select Dropoff Point' :
               vehicle.state === 'DOCKED' ? '🚗 Request New Ride' :
               '🚫 Vehicle Busy'}
            </button>
            {vehicle.state !== 'DOCKED' && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                Wait for vehicle to return to depot
              </p>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="col-span-1 md:col-span-3">
          <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg">
            <Map 
              height={600}
              defaultCenter={[DEPOT_LOCATION.latitude, DEPOT_LOCATION.longitude]}
              defaultZoom={13}
              onClick={handleMapClick}
            >
              {/* Path Visualization */}
              {path.length > 1 && (
                <svg
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 1
                  }}
                >
                  <g>
                    <polyline
                      points={path
                        .map(([lat, lng]) => {
                          try {
                            return `${lng},${lat}`
                          } catch {
                            return ''
                          }
                        })
                        .join(' ')}
                      stroke={vehicle.state === 'IN_RIDE' ? '#22c55e' : '#3b82f6'}
                      strokeWidth="2"
                      fill="none"
                    />
                  </g>
                </svg>
              )}
              {/* Depot Marker */}
              <Marker
                width={50}
                color="black"
                anchor={[DEPOT_LOCATION.latitude, DEPOT_LOCATION.longitude]}
              >
                <div className="bg-white px-2 py-1 rounded shadow">
                  🏢 Depot
                </div>
              </Marker>

              {/* Vehicle Marker */}
              <Marker
                width={50}
                color={vehicle.state === 'DOCKED' ? '#22c55e' : '#3b82f6'}
                anchor={[vehicle.latitude, vehicle.longitude]}
              >
                <div className="bg-white px-2 py-1 rounded shadow">
                  🚗 {vehicle.name} - {vehicle.state}
                </div>
              </Marker>

              {/* Pickup Marker */}
              {rideRequest.pickup && vehicle.state !== 'RETURNING' && (
                <Marker
                  width={50}
                  color="#ef4444"
                  anchor={rideRequest.pickup}
                >
                  <div className="bg-white px-2 py-1 rounded shadow">
                    📍 Pickup
                  </div>
                </Marker>
              )}

              {/* Dropoff Marker */}
              {rideRequest.dropoff && vehicle.state !== 'RETURNING' && (
                <Marker
                  width={50}
                  color="#8b5cf6"
                  anchor={rideRequest.dropoff}
                >
                  <div className="bg-white px-2 py-1 rounded shadow">
                    🏁 Dropoff
                  </div>
                </Marker>
              )}
            </Map>
          </div>
        </div>
      </div>
    </div>
  )
}
              