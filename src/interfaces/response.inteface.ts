export interface Hotel{
  hotel_id: string,
  hotel_name: string,
  hotel_thumbnail: string,
  hotel_location: Location,
  check_in: string,
  check_out: string,
  hotel_website: string,
  rooms: Rooms[]
}

interface Location{
  address: string,
  lat: number,
  long: number
}

export interface Rooms{
    room_type: string,
    capacity: number,
    price: string,
    currency: string,
    room_thumbnail: string,
    description: string,
    beds: Beds
}

interface Beds{
  simple: number,
  double: number
}
