interface IUser {
  id?: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  isValid?: boolean;
}

export default IUser;