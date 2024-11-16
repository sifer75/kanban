import { useEffect, useState } from "react";
import MobileView from "@/components/connection/MobileView";
import DesktopView from "@/components/connection/DesktopView";
function Connection() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const appScreen = windowWidth < 640;
  return <>{appScreen ? <MobileView /> : <DesktopView />}</>;
}

export default Connection;
