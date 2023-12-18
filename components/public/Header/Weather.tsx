import { useEffect, useState } from "react";

const Weather = () => {
  const [weather, setWeather] = useState<{ main: { temp: number } } | null>(
    null
  );
  useEffect(() => {
    const fetchWeather = async () => {
      const res = await fetch("/api/weather");
      const data = await res.json();
      setWeather(data.weather);
    };
    fetchWeather();
  }, []);

  return (
    weather && (
      <strong className=" flex gap-4 bg-slate-600/80 text-white uppercase px-5 py-1.5 rounded-full">
        <span>القاهرة</span>
        <span dir="ltr">{Math.round(weather.main.temp - 273.15) + "C°"}</span>
      </strong>
    )
  );
};

export default Weather;
