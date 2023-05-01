let id = 0;
const max = Number.MAX_SAFE_INTEGER - 900000;
let prefix = 0;

export function safeId() {
  id += 1;
  if (id > max) {
    id = 0;
    prefix += 1;
  }
  return prefix + "" + id;
}
