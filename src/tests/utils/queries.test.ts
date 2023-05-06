import { loginUser, signupUser } from "../../utils/queries";

const log = jest.spyOn(console, "log").mockImplementation(jest.fn());
describe("Queries", ()=> {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  it("Login query", async ()=> {
    const loginData = {
      email: "email@email.com",
      password: "password"
    };
    loginUser(loginData);
    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith({
      email: "email@email.com",
      password: "password"
    });
  })

  it("Signup query", async () => {
    const signupData = {
      username: "username",
      email: "email@email.com",
      password: "password",
      confirmPassword: "password"
    };
    signupUser(signupData);
    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith({
      username: "username",
      email: "email@email.com",
      password: "password",
      confirmPassword: "password"
    });
  })
})