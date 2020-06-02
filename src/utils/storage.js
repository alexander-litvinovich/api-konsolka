import storageDev from "./storage-dev";
import storageProd from "./storage-prod";

const storage =
  process.env.NODE_ENV === "production" ? storageProd : storageDev;

export default storage;
