import bcrypt from 'bcrypt'

export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  } catch (error) {
    throw new Error('Ошибка при хешировании пароля')
  }
}
