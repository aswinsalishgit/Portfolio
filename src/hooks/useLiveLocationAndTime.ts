"use client";

import { useState, useEffect } from "react";

export function useLiveLocationAndTime(defaultLocation: string = "") {
  const [timeStr, setTimeStr] = useState<string>("");
  const [locationStr, setLocationStr] = useState<string>(defaultLocation);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mountHandle = setTimeout(() => setMounted(true), 0);
    
    // Initial time set
    const updateTime = () => {
      setTimeStr(new Date().toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();

    // Update time every second
    const intervalId = setInterval(updateTime, 1000);

    let watchId: number | null = null;

    // Check Geolocation permission silently first
    if (typeof window !== "undefined" && navigator.geolocation && navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" as PermissionName })
        .then((permissionStatus) => {
          const handlePermission = () => {
            if (permissionStatus.state === "granted") {
              // Permission already granted, watch position silently
              watchId = navigator.geolocation.watchPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;
                  const lat = Math.abs(latitude).toFixed(4) + "° " + (latitude >= 0 ? "N" : "S");
                  const lon = Math.abs(longitude).toFixed(4) + "° " + (longitude >= 0 ? "E" : "W");
                  setLocationStr(`${lat}, ${lon}`);
                },
                (error) => {
                  console.warn("Silent geolocation watch failed:", error);
                  setLocationStr("Enable GPS");
                },
                {
                  enableHighAccuracy: true,
                  maximumAge: 0,
                  timeout: 10000,
                }
              );
            } else {
              // 'prompt' or 'denied' - DO NOT call geolocation to avoid prompting the user
              setLocationStr("Enable GPS");
            }
          };

          handlePermission();
          permissionStatus.onchange = handlePermission;
        })
        .catch((error) => {
          console.error("Permissions query failed:", error);
          setLocationStr("Enable GPS");
        });
    } else {
      setLocationStr("Enable GPS");
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(mountHandle);
      if (watchId !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return { timeStr, locationStr, mounted };
}
