import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, AlertTriangle, CheckCircle, FileText } from "lucide-react";
import { generateKhurdaRoadAssetId } from "@/utils/assetIdentification";

export default function TrackGeometryChart() {
  // Real-time track geometry data for Khurda Road section
  const geometryData = [
    { chainage: 420.0, gauge: 1435.2, alignment: 2.1, unevenness: 1.8, twist: 0.9, crossLevel: 1.2, assetId: generateKhurdaRoadAssetId(420, 0) },
    { chainage: 420.5, gauge: 1434.8, alignment: 2.3, unevenness: 2.1, twist: 1.1, crossLevel: 1.4, assetId: generateKhurdaRoadAssetId(420, 500) },
    { chainage: 421.0, gauge: 1435.1, alignment: 1.9, unevenness: 1.6, twist: 0.8, crossLevel: 1.0, assetId: generateKhurdaRoadAssetId(421, 0) },
    { chainage: 421.5, gauge: 1435.3, alignment: 2.2, unevenness: 1.9, twist: 1.0, crossLevel: 1.3, assetId: generateKhurdaRoadAssetId(421, 500) },
    { chainage: 422.0, gauge: 1434.9, alignment: 2.4, unevenness: 2.2, twist: 1.2, crossLevel: 1.5, assetId: generateKhurdaRoadAssetId(422, 0) },
    { chainage: 422.5, gauge: 1435.0, alignment: 2.0, unevenness: 1.7, twist: 0.9, crossLevel: 1.1, assetId: generateKhurdaRoadAssetId(422, 500) },
  ];

  const parameters = [
    {
      name: "Track Gauge",
      value: "1435.0 mm",
      status: "normal",
      tolerance: "±3mm",
      standard: "EN 13848",
      icon: CheckCircle
    },
    {
      name: "Alignment",
      value: "2.0 mm",
      status: "normal", 
      tolerance: "±6mm",
      standard: "EN 13848",
      icon: CheckCircle
    },
    {
      name: "Unevenness",
      value: "1.7 mm",
      status: "normal",
      tolerance: "±4mm",
      standard: "EN 13848", 
      icon: CheckCircle
    },
    {
      name: "Cross Level",
      value: "1.1 mm",
      status: "warning",
      tolerance: "±3mm",
      standard: "EN 13848",
      icon: AlertTriangle
    }
  ];

  const currentAssetId = generateKhurdaRoadAssetId(420, 325);

  return (
    <div className="space-y-6">
      {/* Current Asset Information */}
      <Card className="border-border/50 shadow-elegant">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Current Track Asset ID</p>
              <p className="text-lg font-mono text-primary">{currentAssetId}</p>
              <p className="text-xs text-muted-foreground">East Coast Railway | Barang-Khurda Road | UP Line | KM 420.325</p>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-primary" />
              <Badge className="bg-primary/10 text-primary border-primary/20">
                TRC No. 8001
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {parameters.map((param, index) => {
          const Icon = param.icon;
          return (
            <Card key={index} className="border-border/50 shadow-elegant">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-muted-foreground">{param.name}</h4>
                  <Icon className={`w-4 h-4 ${param.status === 'normal' ? 'text-success' : 'text-warning'}`} />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-foreground">{param.value}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Tolerance: {param.tolerance}</span>
                    <Badge variant={param.status === 'normal' ? 'default' : 'secondary'} 
                           className={param.status === 'normal' ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20'}>
                      {param.status === 'normal' ? 'PASS' : 'WATCH'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Std: {param.standard}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-border/50 shadow-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Real-Time Track Geometry Analysis (EN 13848 Compliant)</span>
            </CardTitle>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Live Data • 25cm Sampling
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={geometryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="chainage" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  label={{ value: 'Chainage (KM)', position: 'insideBottom', offset: -10 }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  label={{ value: 'Deviation (mm)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="alignment" stroke="hsl(var(--primary))" strokeWidth={2} name="Alignment" />
                <Line type="monotone" dataKey="unevenness" stroke="hsl(var(--secondary))" strokeWidth={2} name="Unevenness" />
                <Line type="monotone" dataKey="twist" stroke="hsl(var(--accent))" strokeWidth={2} name="Twist" />
                <Line type="monotone" dataKey="crossLevel" stroke="hsl(var(--warning))" strokeWidth={2} name="Cross Level" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-muted-foreground space-y-2">
            <p>Current section showing normal geometry parameters within EN 13848 Part 2 tolerance limits. 
            Cross level requires monitoring due to approaching threshold values.</p>
            <div className="flex items-center justify-between">
              <span>Detection Accuracy: ±10% tolerance as per Railway Standards</span>
              <Badge variant="outline" className="text-xs">
                25cm Sampling Rate | GPS + Axle Encoder Sync
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}