import bcrypt from "bcrypt"

export async function hashPassword(password: string): Promise<string> {
	try {
	  const salt = await bcrypt.genSalt(10);
	  const hashedPassword = await bcrypt.hash(password, salt);
	  return hashedPassword;
	} catch (error) {
	  throw new Error('Ошибка при хешировании пароля');
	}
}

// async function checkPassword(password:string, hashedPassword:string) {
// 	try {
// 		const match = await bcrypt.compare(password, hashedPassword);
// 		return match;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }