import { UserData } from "../pages/home/interfaces/userData";

export const saveUsers = (userData: UserData[]) => {
  localStorage.setItem('users', JSON.stringify(userData));
}

export const getUsers = () => {
  const userData = localStorage.getItem('users');

  return userData;
}

export const usersMock = [
  {
    id: 1,
    email: "alisha@gmail.com",
    username: "Alisha",
    createdAt: new Date(),
    cpf: 12345678901
  },
  {
    id: 2,
    email: "jassa12@gmail.com",
    username: "Jassa@",
    createdAt: new Date(),
    cpf: 21445678401
  },
  {
    id: 3,
    email: "ajkay@gmail.com",
    username: "AJAY12",
    createdAt: new Date(),
    cpf: 12833556609
  },
  {
    id: 4,
    email: "harjas@gmail.com",
    username: "Harjas",
    createdAt: new Date(),
    cpf: 12313656909
  }
]
