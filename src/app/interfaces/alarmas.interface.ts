export interface Alarma {
    'Parquimetro': string;
    'Barrio': string;
    'Direccion': string;
    'Longitud': number;
    'Latitud': number;
    'Estado': string;
    'Fuente': string;
    'Tarifa'?: string;
    'Error'?: boolean;
}

export interface Detalles {
    Parquimetro: string;
    Descripcion: string;
    Estado: string;
    Fuente: string;
    FechaInicio: any;
    idAlarmaActual: string;
    prioridad?: number;
}
export interface InfoAlarma {
  'alarma': {
    'Parquimetro': string;
    'Barrio': string;
    'Direccion': string;
    'Longitud': number;
    'Latitud': number;
    'Estado': string;
    'Fuente': string;
  };
  'detalles': Detalles[]
}

export interface Barrios {
  barrio: string;
  activo: boolean;
  alarmas: any[];
}


export interface LayerBarrio {
  id: string;
  fillColor: string;
  coords: {lat: number, lng: number}[];
}

export interface Parquimetro {
  id?: string;
  alias: string;
  barrio: string;
  direccion: string;
  date?: number;
  desc?: string;
  empresa: string;
  estado: string;
  fabricante: string;
  hecho?: boolean;
  idx?: number;
  urlImg?: string;
  nameImg?: string;
  Latitud: number;
  Longitud: number;
  info?: boolean;
  opacidad?: number;
  tarifa: string;
}
export interface Marker {
  alarma: Alarma;
  detalles: Detalles[];
}

export interface ArrayPark {
  parkimetros: Parquimetro[];
}


export interface UserIterface {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered: string;
  id?: string;
}

export interface ListaInteface {
  localId: string;
  titulo: string;
  items: Parquimetro[];
  uid?: string;
}

export interface BarrioInterface {
  localId: string;
  barrio: string;
  titulo: string;
  uid?: string;
  hecho: boolean;
  date?: number;
  items: Parquimetro[];
}

export interface objStorage {
  barrio: string;
  devas: string;
  numero: string;
  activo: boolean;
}

export interface GeolocationPosition {
  coords: {
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: any;
    latitude: number;
    longitude: number;
    speed: any;
  },
  timestamp: number
}

export interface SemaroroRojo {
  id: string;
  direccion: string;
  coord: {lat: number, lng: number};
}

