export interface HeroConfig {
  timerTitle: string;
  targetDate: string; // If empty, auto-calculates from packages
  formTitle: string;
}

export const getHeroConfig = (): HeroConfig => {
  const store = localStorage.getItem("ananda_rath_hero_config");
  if (store) return JSON.parse(store);
  return {
    timerTitle: "NEXT YATRA DEPARTING IN",
    targetDate: "",
    formTitle: "Book Your Seat Now",
  };
};

export const saveHeroConfig = (config: HeroConfig) => {
  localStorage.setItem("ananda_rath_hero_config", JSON.stringify(config));
};
