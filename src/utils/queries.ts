export const loginUser = (data: {email: string, password: string}) => {
  console.log(data);
}

export const signupUser = (data: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  console.log(data);
}