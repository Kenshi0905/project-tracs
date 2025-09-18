import SystemHeader from "@/components/SystemHeader";
import HeroSection from "@/components/HeroSection";
import RealTimeMetrics from "@/components/RealTimeMetrics";
import SystemArchitecture from "@/components/SystemArchitecture";
import TrackGeometryChart from "@/components/TrackGeometryChart";
import DefectDetection from "@/components/DefectDetection";
import ComplianceStatus from "@/components/ComplianceStatus";
import ExceptionReport from "@/components/ExceptionReport";
import SummaryReports from "@/components/SummaryReports";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <SystemHeader />
      <HeroSection />
      
      <div className="container mx-auto px-6 py-8">
        {/* Real-time metrics overview */}
        <section className="mb-8">
          <RealTimeMetrics />
        </section>

        {/* Main dashboard tabs */}
        <Tabs defaultValue="monitoring" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
            <TabsTrigger value="architecture">System Architecture</TabsTrigger>
            <TabsTrigger value="defects">AI Defect Detection</TabsTrigger>
            <TabsTrigger value="compliance">Standards Compliance</TabsTrigger>
            <TabsTrigger value="exceptions">Exception Reports</TabsTrigger>
            <TabsTrigger value="summary">Summary Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monitoring" className="space-y-6">
            <TrackGeometryChart />
          </TabsContent>
          
          <TabsContent value="architecture" className="space-y-6">
            <SystemArchitecture />
          </TabsContent>
          
          <TabsContent value="defects" className="space-y-6">
            <DefectDetection />
          </TabsContent>
          
          <TabsContent value="compliance" className="space-y-6">
            <ComplianceStatus />
          </TabsContent>
          
          <TabsContent value="exceptions" className="space-y-6">
            <ExceptionReport />
          </TabsContent>
          
          <TabsContent value="summary" className="space-y-6">
            <SummaryReports />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Index;
