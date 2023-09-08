import { Extension } from "@terra-money/terra.js/dist/extension/index";

const pool = new Map<string, Extension>();

export default (id: string): Extension => {
  if (pool.has(id)) return pool.get(id)!;

  //create new
  const ext = new Extension(id);

  //add to pool
  pool.set(id, ext);
  console.log(pool);

  return ext;
};
