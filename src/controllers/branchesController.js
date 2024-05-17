import { Branch } from "../database/db.js";

export const createBranch = async (
  province,
  city,
  zip_code,
  direction,
  phone,
  type
) => {
  const newBranch = await Branch.create({
    province,
    city,
    zip_code,
    direction,
    phone,
    type,
  });

  return newBranch;
};

export const getBranches = async () =>{

}