import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertTriangle, FileText, Zap } from "lucide-react";
import { INSPECTION_ACCURACY_STANDARDS } from "@/utils/inspectionAccuracy";
import { generateKhurdaRoadAssetId } from "@/utils/assetIdentification";

export default function TechnicalSpecifications() {
  const currentLocation = {
    km: 420,
    meter: 325.5,
    section: "Barang-Khurda Road",
    line: "UP Line",
    zone: "East Coast Railway"
  };

  const assetId = generateKhurdaRoadAssetId(currentLocation.km, currentLocation.meter);

  const fastRecordingFeatures = [
    { id: 1, feature: "KM Post", detected: true, confidence: 98.5 },
    { id: 2, feature: "TP/OHE Mast", detected: true, confidence: 96.2 },
    { id: 3, feature: "Point & Crossing", detected: false, confidence: 0 },
    { id: 4, feature: "Level Crossing", detected: false, confidence: 0 },
    { id: 5, feature: "Bridge (Major)", detected: false, confidence: 0 },
    { id: 6, feature: "Signal", detected: true, confidence: 94.8 },
    { id: 7, feature: "Transponder", detected: true, confidence: 92.1 },
    { id: 8, feature: "Neutral Section", detected: false, confidence: 0 },
    { id: 9, feature: "Traction Substation", detected: false, confidence: 0 },
    { id: 10, feature: "Emergency Socket", detected: true, confidence: 89.3 }
  ];

  const realTimeDetections = [
    {
      component: "Rails",
      parameter: "Linear Longitudinal Defect",
      detected: 1.2,
      standard: 1.0,
      status: "detected",
      location: "KM 420.325"
    },
    {
      component: "Sleepers",
      parameter: "Concrete Sleeper Crack",
      detected: 2.5,
      standard: 2.0,
      status: "detected",
      location: "KM 420.289"
    },
    {
      component: "Ballast",
      parameter: "Ballast Level",
      detected: 28.0,
      standard: 25.0,
      status: "detected",
      location: "KM 420.156"
    },
    {
      component: "Fastenings",
      parameter: "Base Plate Crack",
      detected: 0.6,
      standard: 0.5,
      status: "detected",
      location: "KM 420.098"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Current Asset Information */}
      <Card className="border-border/50 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary" />
            <span>Current Track Asset Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Asset ID</p>
                <p className="text-lg font-mono text-primary">{assetId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Location</p>
                <p className="text-sm">{currentLocation.section}, {currentLocation.line}</p>
                <p className="text-sm">KM {currentLocation.km}.{currentLocation.meter.toString().padStart(3, '0')}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Railway Zone</p>
                <p className="text-sm">{currentLocation.zone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">TRC Details</p>
                <p className="text-sm">TRC No. :8001 - RUN Date :19-Mar-2025</p>
                <p className="text-sm">RUN No. :19-03-2025/b</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="accuracy" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="accuracy">Inspection Accuracy Standards</TabsTrigger>
          <TabsTrigger value="features">Fast Recording Features</TabsTrigger>
          <TabsTrigger value="realtime">Real-time Detections</TabsTrigger>
        </TabsList>

        <TabsContent value="accuracy" className="space-y-6">
          <Card className="border-border/50 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>Track Component Video Inspection System - Accuracy Requirements</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Under/over reporting tolerance: ±10% for all parameters
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {['Fastenings', 'Sleepers', 'Rails', 'Ballast'].map(component => (
                  <div key={component}>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">{component}</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Parameter</TableHead>
                          <TableHead>Minimum Requirements</TableHead>
                          <TableHead>Tolerance</TableHead>
                          <TableHead>Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {INSPECTION_ACCURACY_STANDARDS
                          .filter(std => std.component === component)
                          .map((standard, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{standard.parameter}</TableCell>
                              <TableCell>
                                {standard.minWidth && standard.minLength 
                                  ? `${standard.minWidth}×${standard.minLength} ${standard.unit}`
                                  : standard.minArea 
                                    ? `${standard.minArea} ${standard.unit}`
                                    : standard.minValue 
                                      ? `${standard.minValue} ${standard.unit}`
                                      : standard.minRotation 
                                        ? `${standard.minRotation}° rotation`
                                        : 'N/A'
                                }
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                                  ±{standard.tolerance}%
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {standard.description}
                              </TableCell>
                            </TableRow>
                          ))
                        }
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card className="border-border/50 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-primary" />
                <span>Fast Mode Recording Features</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Real-time detection status for infrastructure features
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fastRecordingFeatures.map(feature => (
                  <div key={feature.id} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {feature.detected ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
                      )}
                      <span className="text-sm font-medium">{feature.feature}</span>
                    </div>
                    {feature.detected && (
                      <Badge variant="outline" className="text-xs">
                        {feature.confidence}%
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realtime" className="space-y-6">
          <Card className="border-border/50 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <span>Real-time Defect Detections</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Current detections based on accuracy standards
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Detected Value</TableHead>
                    <TableHead>Min Standard</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {realTimeDetections.map((detection, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{detection.component}</TableCell>
                      <TableCell>{detection.parameter}</TableCell>
                      <TableCell>
                        <span className="font-mono">{detection.detected} mm</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-muted-foreground">{detection.standard} mm</span>
                      </TableCell>
                      <TableCell>{detection.location}</TableCell>
                      <TableCell>
                        <Badge className="bg-warning/10 text-warning border-warning/20">
                          Detected
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}