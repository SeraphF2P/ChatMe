export declare global {
  type CityInfoType = {
    name: string;
    latitude: number;
    longitude: number;
  };
  type WeatherApiOutput = {
    weather: [{ description: string; icon: string }];
    main: {
      temp: number;
      feels_like: number;
      humidity: string;
      pressure: string;
    };
    wind: {
      speed: string;
    };
  }
  type ForecastApiOutput = {
    list: {
      main: {
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        humidity: number;
      };
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        }
      ];
      clouds: {
        all: number;
      };
      wind: {
        speed: number;
      };
    }[];
  }
}