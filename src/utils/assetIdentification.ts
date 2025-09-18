// Asset Identification System as per Railway Standards
// Format: DE23123456789999003005005

export interface AssetIdentification {
  versionNo: string;
  zonalRailway: string;
  railwayDivision: string;
  trackAsset: string;
  chainageKm: string;
  chainageMeter: string;
}

export const ZONAL_RAILWAYS = {
  'CR': { code: '01', name: 'Central Railway' },
  'ECR': { code: '07', name: 'East Coast Railway' },
  'ER': { code: '02', name: 'Eastern Railway' },
  'ECoR': { code: '18', name: 'East Coast Railway' },
  'NCR': { code: '03', name: 'North Central Railway' },
  'NER': { code: '28', name: 'North Eastern Railway' },
  'NFR': { code: '34', name: 'Northeast Frontier Railway' },
  'NR': { code: '23', name: 'Northern Railway' },
  'NWR': { code: '30', name: 'North Western Railway' },
  'SCR': { code: '14', name: 'South Central Railway' },
  'SER': { code: '15', name: 'South Eastern Railway' },
  'SR': { code: '39', name: 'Southern Railway' },
  'SWR': { code: '59', name: 'South Western Railway' },
  'WCR': { code: '68', name: 'West Central Railway' },
  'WR': { code: '63', name: 'Western Railway' }
};

export const RAILWAY_DIVISIONS = {
  'ECR': {
    'DHN': { code: '18', name: 'Dhanbad Division' },
    'ASN': { code: '19', name: 'Asansol Division' },
    'RNC': { code: '20', name: 'Ranchi Division' }
  }
};

export function generateAssetId(
  zonal: keyof typeof ZONAL_RAILWAYS,
  division: string,
  assetType: string,
  km: number,
  meter: number
): string {
  const versionNo = 'D';
  const zonalCode = ZONAL_RAILWAYS[zonal]?.code || '18';
  const divisionCode = division.padStart(2, '0');
  const assetCode = assetType.padEnd(12, '0');
  const kmCode = km.toString().padStart(4, '0');
  const meterCode = Math.round(meter * 10).toString().padStart(5, '0');
  
  return `${versionNo}${zonalCode}${divisionCode}${assetCode}${kmCode}${meterCode}`;
}

export function parseAssetId(assetId: string): AssetIdentification | null {
  if (assetId.length !== 25) return null;
  
  return {
    versionNo: assetId.substring(0, 1),
    zonalRailway: assetId.substring(1, 3),
    railwayDivision: assetId.substring(3, 5),
    trackAsset: assetId.substring(5, 17),
    chainageKm: assetId.substring(17, 21),
    chainageMeter: assetId.substring(21, 25)
  };
}

// Generate Khurda Road specific asset IDs
export function generateKhurdaRoadAssetId(km: number, meter: number, assetType: string = 'TRACK'): string {
  return generateAssetId('ECR', '18', assetType, km, meter);
}