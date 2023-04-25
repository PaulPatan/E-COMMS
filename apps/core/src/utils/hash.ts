import bcrypt from 'bcrypt';

export const generateSalt = async (): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return salt;
};

export const hashPassword = async (password: string, salt: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};