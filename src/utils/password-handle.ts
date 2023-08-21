import crypto from "crypto";

export function md5password(password: string): string {
  const md5 = crypto.createHash("md5");
  return md5.update(password).digest("hex");
}
