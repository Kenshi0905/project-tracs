// Track Component Video Inspection System Accuracy Standards
// As per Railway Technical Manual

export interface AccuracyStandard {
  component: string;
  parameter: string;
  minWidth?: number;
  minLength?: number;
  minArea?: number;
  minValue?: number;
  minRotation?: number;
  tolerance: number;
  unit: string;
  description: string;
}

export const INSPECTION_ACCURACY_STANDARDS: AccuracyStandard[] = [
  // Fastenings
  {
    component: 'Fastenings',
    parameter: 'Base Plate Crack',
    minWidth: 0.5,
    minLength: 10.0,
    tolerance: 10,
    unit: 'mm',
    description: 'Base plate crack check with minimum width of 0.5 mm and length of 10.0 mm'
  },
  
  // Sleepers
  {
    component: 'Sleepers',
    parameter: 'Concrete Sleeper Crack',
    minWidth: 2.0,
    minLength: 20.0,
    tolerance: 10,
    unit: 'mm',
    description: 'Concrete sleeper crack with minimum width of 2 mm and minimum length 20 mm'
  },
  {
    component: 'Sleepers',
    parameter: 'Concrete Sleeper Misalignment',
    minRotation: 5.0,
    tolerance: 10,
    unit: 'degree',
    description: 'Concrete sleeper misalignment with minimum rotation of 5.0 degree'
  },
  {
    component: 'Sleepers',
    parameter: 'Concrete Sleeper Level',
    minValue: 2.0,
    tolerance: 10,
    unit: 'mm',
    description: 'Concrete sleeper level check with minimum difference of 2.0 mm w.r.t rail level'
  },
  
  // Rails
  {
    component: 'Rails',
    parameter: 'Linear Longitudinal Defect',
    minWidth: 1.0,
    minLength: 10.0,
    tolerance: 10,
    unit: 'mm',
    description: 'Crack on rail top with minimum width of 1.0 mm and minimum length of 10.0 mm'
  },
  {
    component: 'Rails',
    parameter: 'Gauge Corner Defect',
    minWidth: 0.1,
    minLength: 0.9,
    tolerance: 10,
    unit: 'mm',
    description: 'Gauge corner defect with minimum size of 0.1mm x 0.9 mm (>10 in 1 metre)'
  },
  {
    component: 'Rails',
    parameter: 'Area Defect',
    minArea: 10,
    tolerance: 10,
    unit: 'mm²',
    description: 'Squat & wheel burn etc. with minimum area of 10mm²'
  },
  {
    component: 'Rails',
    parameter: 'Joint Gap Measurement',
    minValue: 2.0,
    tolerance: 10,
    unit: 'mm',
    description: 'Fish plated and SEJ with minimum value of 2.0 mm'
  },
  {
    component: 'Rails',
    parameter: 'Misaligned Weld Detection',
    minValue: 1.0,
    tolerance: 10,
    unit: 'mm',
    description: 'Misaligned and cupped weld detection & measurement with minimum value of 1.0 mm'
  },
  
  // Ballast
  {
    component: 'Ballast',
    parameter: 'Ballast Area Defect',
    minArea: 0.5,
    tolerance: 10,
    unit: 'm²',
    description: 'Excess/Deficiency of ballast in terms of area with minimum identifiable area of 0.5m²'
  },
  {
    component: 'Ballast',
    parameter: 'Ballast Level',
    minValue: 25.0,
    tolerance: 10,
    unit: 'mm',
    description: 'Level of ballast w.r.t center of sleeper with minimum value of 25.0 mm'
  }
];

export function validateDefectAccuracy(
  detectedValue: number,
  standard: AccuracyStandard,
  actualValue: number
): {
  isAccurate: boolean;
  errorPercentage: number;
  withinTolerance: boolean;
} {
  const errorPercentage = Math.abs((detectedValue - actualValue) / actualValue) * 100;
  const withinTolerance = errorPercentage <= standard.tolerance;
  
  return {
    isAccurate: detectedValue >= (standard.minValue || standard.minWidth || standard.minLength || standard.minArea || 0),
    errorPercentage,
    withinTolerance
  };
}

export function getAccuracyStandardsByComponent(component: string): AccuracyStandard[] {
  return INSPECTION_ACCURACY_STANDARDS.filter(std => std.component === component);
}