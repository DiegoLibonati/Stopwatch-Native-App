import { createContext, useState } from "react";
import { skins } from "../helpers/constants/data";
import {
  Crono,
  CronoContextProps,
  CronoContextT,
  Skin,
} from "../types/entities";

export const CronoContext = createContext<CronoContextT | null>(null);

export const CronoProvider: React.FunctionComponent<CronoContextProps> = ({
  children,
}) => {
  const [crono, setCrono] = useState<Crono>({
    screen: "00:00:00",
    isOn: false,
  });
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
  const [image, setImage] = useState<Skin>(skins[0]);

  const startCrono = (): void => {
    if (intervalId) return;

    const timeSplit = crono.screen.split(":");

    let hours = Number(timeSplit[0]) ? Number(timeSplit[0]) : 0;
    let minutes = Number(timeSplit[1]) ? Number(timeSplit[1]) : 0;
    let seconds = Number(timeSplit[2]) ? Number(timeSplit[2]) : 0;

    const interval = setInterval(() => {
      seconds += 1;

      if (seconds === 60) {
        minutes += 1;
        seconds = 0;
      }

      if (minutes === 60) {
        hours += 1;
        minutes = 0;
      }

      const secondsAux = seconds < 10 ? `0${seconds}` : seconds;
      const minutesAux = minutes < 10 ? `0${minutes}` : minutes;
      const hoursAux = hours < 10 ? `0${hours}` : hours;

      setCrono({
        screen: `${hoursAux}:${minutesAux}:${secondsAux}`,
        isOn: true,
      });
    }, 1000);

    setIntervalId(interval);
  };

  const clearCrono = (): void => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      return setCrono({
        screen: "00:00:00",
        isOn: false,
      });
    }

    return setCrono({
      screen: "00:00:00",
      isOn: false,
    });
  };

  const stopCrono = (): void => {
    clearInterval(intervalId!);
    setIntervalId(null);
    return setCrono({
      ...crono,
      isOn: false,
    });
  };

  const changeSkin = (skin: Skin): void => {
    return setImage(skin);
  };

  return (
    <CronoContext.Provider
      value={{
        crono,
        image,
        intervalId,
        startCrono,
        clearCrono,
        stopCrono,
        changeSkin,
      }}
    >
      {children}
    </CronoContext.Provider>
  );
};
