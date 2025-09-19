import { Activity, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import tracsLogo from "@/assets/tracs-logo-full.jpg";

export default function SystemHeader() {
  return (
    <header className="bg-gradient-primary border-b border-border/50 shadow-elegant">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img 
                src={tracsLogo} 
                alt="TRACS - Track Reliability and Condition Surveillance"
                className="h-12 w-auto object-contain"
              />
            </div>
            <Badge variant="secondary" className="ml-4">
              <Activity className="w-3 h-3 mr-1" />
              LIVE
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right text-primary-foreground/90">
              <p className="text-sm font-medium">System Status: Online</p>
              <p className="text-xs">EN 13848 & RDSO Compliant</p>
            </div>
            <Button variant="header" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="header" size="sm">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}