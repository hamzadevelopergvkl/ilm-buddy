import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Navigation } from "lucide-react";

const QiblaFinder = () => {
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [compassHeading, setCompassHeading] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Listen to device orientation for compass
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        setCompassHeading(360 - event.alpha);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const calculateQibla = (lat: number, lng: number) => {
    // Kaaba coordinates
    const kaabaLat = 21.4225;
    const kaabaLng = 39.8262;

    const dLng = ((kaabaLng - lng) * Math.PI) / 180;
    const lat1 = (lat * Math.PI) / 180;
    const lat2 = (kaabaLat * Math.PI) / 180;

    const y = Math.sin(dLng) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

    let bearing = Math.atan2(y, x);
    bearing = (bearing * 180) / Math.PI;
    bearing = (bearing + 360) % 360;

    return bearing;
  };

  const findQibla = () => {
    setLoading(true);

    if (!navigator.geolocation) {
      toast({
        title: "❌ Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        setUserLocation({ lat, lng });
        const direction = calculateQibla(lat, lng);
        setQiblaDirection(direction);
        
        toast({
          title: "✅ Location Found",
          description: "Qibla direction calculated successfully",
        });
        setLoading(false);
      },
      (error) => {
        toast({
          title: "❌ Location Error",
          description: "Could not get your location. Please enable location services.",
          variant: "destructive",
        });
        setLoading(false);
      }
    );
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 sm:p-6 border-b border-border bg-card">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
          🧭 Qibla Finder
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Find the direction to Kaaba</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <Card className="p-4 sm:p-6 space-y-6">
          {!qiblaDirection ? (
            <div className="text-center space-y-6">
              <div className="text-6xl sm:text-8xl">🕋</div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                  Find Qibla Direction
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Allow location access to calculate the direction to Kaaba in Mecca
                </p>
              </div>
              <Button
                onClick={findQibla}
                disabled={loading}
                className="bg-gradient-islamic hover:opacity-90"
                size="lg"
              >
                {loading ? "⏳ Getting Location..." : <><MapPin className="w-4 h-4 mr-2" /> Find Qibla</>}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto">
                  {/* Compass background */}
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20 bg-gradient-to-br from-primary/5 to-background"></div>
                  
                  {/* Compass markings */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute top-2 text-xs font-bold text-foreground">N</div>
                    <div className="absolute right-2 text-xs font-bold text-muted-foreground">E</div>
                    <div className="absolute bottom-2 text-xs font-bold text-muted-foreground">S</div>
                    <div className="absolute left-2 text-xs font-bold text-muted-foreground">W</div>
                  </div>

                  {/* Qibla direction arrow */}
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
                    style={{
                      transform: `rotate(${qiblaDirection - compassHeading}deg)`,
                    }}
                  >
                    <Navigation className="w-16 h-16 sm:w-20 sm:h-20 text-primary fill-primary" />
                  </div>

                  {/* Center Kaaba icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-3xl sm:text-4xl">🕋</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-lg sm:text-xl font-semibold text-foreground">
                    Qibla Direction: {qiblaDirection.toFixed(1)}°
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Point your device in the direction of the arrow
                  </p>
                </div>
              </div>

              {userLocation && (
                <div className="bg-primary/10 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium text-foreground">📍 Your Location</p>
                  <p className="text-xs text-muted-foreground">
                    Latitude: {userLocation.lat.toFixed(4)}°
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Longitude: {userLocation.lng.toFixed(4)}°
                  </p>
                </div>
              )}

              <Button
                onClick={findQibla}
                variant="outline"
                className="w-full"
                disabled={loading}
              >
                🔄 Recalculate
              </Button>
            </div>
          )}

          <div className="border-t border-border pt-4 space-y-2">
            <p className="text-xs font-medium text-primary">ℹ️ Tips:</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>Ensure location services are enabled</li>
              <li>For best results, use in an open area</li>
              <li>The arrow points towards Kaaba in Mecca</li>
              <li>Calibrate your device's compass if needed</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QiblaFinder;
