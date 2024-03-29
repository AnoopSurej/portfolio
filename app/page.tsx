import { HomeData } from "@/types/home.types";
import fs from "fs/promises";

const Home = async () => {
  let homeData: HomeData | undefined;

  try {
    const file = await fs.readFile(process.cwd() + "/home.json", "utf8");
    homeData = JSON.parse(file);
  } catch (error) {
    console.error("Error reading JSON file:", error);
  }

  if (!homeData) {
    return <div>Loading...</div>;
  }

  if (homeData.custom === true) {
    return (
      <div className="flex justify-center">
        <div className="m-auto h-dvh">
          <h1>Custom Page here</h1>
        </div>
      </div>
    );
  } else if (homeData.custom === false) {
    return (
      <div className="flex justify-center mt-[20%] mb-[30%]">
        <h1>Hi, I'm Anoop!</h1>
      </div>
    );
  }
};

export default Home;
