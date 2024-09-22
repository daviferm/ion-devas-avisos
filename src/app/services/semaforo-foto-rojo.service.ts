import { Injectable } from '@angular/core';
import { SemaroroRojo } from '../interfaces/alarmas.interface';

@Injectable({
  providedIn: 'root'
})
export class SemaforoFotoRojoService {


  public semaforoFotoRojo: SemaroroRojo[] = [
    {
      id: '724',
      direccion: 'ALBERTO AGUILERA - BALTASAR GRACIÁN',
      coord: {lat: 40.4300318814237, lng: -3.7109330225262}
    },
    {
      id: '1466',
      direccion: 'ALCALA - SAN ROMUALDO',
      coord: {lat: 40.4416304601236, lng: -3.6240804936097}
    },
    {
      id: '1467',
      direccion: 'ASCAO - EMILIO FERRARI',
      coord: {lat: 40.4305524899077, lng: -3.6400908007429}
    },
    {
      id: '1471',
      direccion: 'AVDA. AMERICA - CARTAGENA',
      coord: {lat: 40.4392447733440, lng: -3.6729404308478}
    },
    {
      id: '832',
      direccion: 'AVDA. ANDALUCÍA - ALCOCER',
      coord: {lat: 40.3506812407502, lng: -3.6930234934869}
    },
    {
      id: '542',
      direccion: 'AVDA. ANDALUCÍA - METRO SAN CRISTOBAL',
      coord: {lat: 40.3417520664563, lng: -3.6928698440320}
    },
    {
      id: '109',
      direccion: 'AVDA. CARDENAL HERRERA ORIA, 83',
      coord: {lat: 40.4892018944789, lng: -3.7010164870912}
    },
    {
      id: '1469',
      direccion: 'AVDA. CIUDAD BARCELONA - MENÉNDEZ PELAYO',
      coord: {lat: 40.4041299391769, lng: -3.6804044866607}
    },
    {
      id: '1474',
      direccion: 'AVDA. DE LA PESETA - CTRA  BARRIO FORTUNA',
      coord: {lat: 40.3695005251065, lng: -3.7658350496983}
    },
    {
      id: '436',
      direccion: 'AVDA. DE LOS POBLADOS, 45',
      coord: {lat: 40.3840856059446, lng: -3.7597718445530}
    },
    {
      id: '539',
      direccion: 'AVDA. FILIPINAS, 18',
      coord: {lat: 40.4400855313958, lng: -3.7101321157429}
    },
    {
      id: '541',
      direccion: 'AVDA. ILUSTRACIÓN - BETANZOS',
      coord: {lat: 40.4805201405988, lng: -3.7120999194573}
    },
    {
      id: '536',
      direccion: 'AVDA. LOGROÑO, 44',
      coord: {lat: 40.4602447254292, lng: -3.5936820012894}
    },
    {
      id: '1465',
      direccion: 'AVDA. MARQUÉS CORBERA - RICARDO ORTIZ',
      coord: {lat: 40.4228572739567, lng: -3.6559439951609}
    },
    {
      id: '769',
      direccion: 'AVDA. MEDITERRÁNEO, 32',
      coord: {lat: 40.4069413363842, lng: -3.6731001392556}
    },
    {
      id: '535',
      direccion: 'CAMINO DE LOS VINATEROS, 47',
      coord: {lat: 40.4107369125276, lng: -3.6547920067833}
    },
    {
      id: '718',
      direccion: 'CARDENAL HERRERA ORIA - LA MASÓ',
      coord: {lat: 40.4832607958965, lng: -3.7138128068880}
    },
    {
      id: '1547',
      direccion: 'CEA BERMÚDEZ - VALLEHERMOSO',
      coord: {lat: 40.4388566130951, lng: -3.7086762383598}
    },
    {
      id: '1472',
      direccion: 'CNO BARRIAL - FDO LAZARO CARRETER',
      coord: {lat: 40.4622670827045, lng: -3.7933050239540}
    },
    {
      id: '1473',
      direccion: 'CTRA. CARABANCHEL ARAVACA - VILLAVICIOSA',
      coord: {lat: 40.3969454079397, lng: -3.7743326445944}
    },
    {
      id: '722',
      direccion: 'FRANCISCO PI Y MARGALL ESQ, ANA DE AUSTRIA',
      coord: {lat: 40.4910061217470, lng: -3.6597406437581}
    },
    {
      id: '770',
      direccion: 'FRANCISCO SILVELA, 62',
      coord: {lat: 40.4352122060793, lng: -3.6750225366017}
    },
    {
      id: '1551',
      direccion: 'FRANCISCO SILVELA, 99',
      coord: {lat: 40.4394873905306, lng: -3.6797031586465}
    },
    {
      id: '720',
      direccion: 'FUENTE CARRANTONA - HACIENDA PAVONES',
      coord: {lat: 40.4005108310187, lng: -3.6364119605541}
    },
    {
      id: '1475',
      direccion: 'GRAL RICARDOS - PSO QUINCE DE MAYO',
      coord: {lat: 40.3968891905669, lng: -3.7173362327617}
    },
    {
      id: '220',
      direccion: 'HNOS, GARCÍA NOBLEJAS 123',
      coord: {lat: 40.4203428660344, lng: -3.6252187260059}
    },
    {
      id: '1550',
      direccion: 'JOAQUIN COSTA, 36',
      coord: {lat: 40.4409330874192, lng: -3.6811544192886}
    },
    {
      id: '728',
      direccion: 'JOAQUIN COSTA - VELAZQUEZ',
      coord: {lat: 40.4429335645638, lng: -3.6833030102454}
    },
    {
      id: '1468',
      direccion: 'JOSE ABASCAL - SANTA ENGRACIA',
      coord: {lat: 40.4385439217755, lng: -3.7008300960524}
    },
    {
      id: '768',
      direccion: 'MENÉNDEZ PELAYO - NIÑO JESÚS',
      coord: {lat: 40.4146586584747, lng: -3.6775375474637}
    },
    {
      id: '1470',
      direccion: 'MONFORTE DE LEMOS - FINISTERRE',
      coord: {lat: 40.4798243892770, lng: -3.7022989226766}
    },
    {
      id: '618',
      direccion: 'O DONNELL CARRIL CENTRAL',
      coord: {lat: 40.4210668083416, lng: -3.6681907945495}
    },
    {
      id: '439',
      direccion: 'PO CASTELLANA, 105',
      coord: {lat: 40.4546446063381, lng: -3.6905547438765}
    },
    {
      id: '545',
      direccion: 'PO CASTELLANA, 167',
      coord: {lat: 40.4621563254172, lng: -3.6898344823679}
    },
    {
      id: '746',
      direccion: 'SINESIO DELGADO GTA P, CEBRERO',
      coord: {lat: 40.4712495042102, lng: -3.7111654472985}
    },
    {
      id: '538',
      direccion: 'VENTISQUERO DE LA CONDESA, 42',
      coord: {lat: 40.4940908754854, lng: -3.7174482694785}
    },
    {
      id: '734',
      direccion: 'VIA LUSITANA - PL ELÍPTICA',
      coord: {lat: -3.7184266162498, lng: 40.3846754884064}
    },
  ]

  constructor() { }
}
