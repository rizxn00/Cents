import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export const Theme: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Render nothing until mounted
  }

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.value);
  };

  return (
    <div>
      <ul className="grid w-full gap-6 md:grid-cols-2">
        <li>
          <label className={`inline-flex items-center justify-center w-full p-5 border-2 rounded-lg cursor-pointer h-24 bg-zinc-100 text-sm font-medium transition-all hover:bg-zinc-200 text-black select-none ${ theme === "light" ? "border-orange-700" : "" }`} >
          <input type="radio" name="theme" id="light" value="light" className="hidden peer" checked={theme === "light"} onChange={handleThemeChange}/>
            Light
          </label>
        </li>
        <li>
          <label className={`inline-flex items-center justify-center w-full p-5 border-2 rounded-lg cursor-pointer h-24 bg-zinc-950 text-sm font-medium transition-all hover:bg-zinc-900 text-white select-none ${ theme === "dark" ? "border-orange-700" : "" }`} >
          <input type="radio" name="theme" id="dark" value="dark" className="hidden peer" checked={theme === "dark"} onChange={handleThemeChange}/>
            Dark
          </label>
        </li>
      </ul>
    </div>
  );
};
