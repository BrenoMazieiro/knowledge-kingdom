import { db } from "../../../infra/database/client";
import { HouseRepository } from "./houseRepository";

export const houseRepository = new HouseRepository(db);
