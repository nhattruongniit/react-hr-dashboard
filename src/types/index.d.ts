export interface IUser {
  "id": string,
  "avatar": string,
  "email": string,
  "role": string, 
}

export interface ISocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
}
export interface IEmployee {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  date_of_birth: string;
  gender: string;
  position: string;
  department: string;
  hire_date: string;
  employment_type: string;
  status: string;
  avatar: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  age: number;
  __v: number;
  city: string;
  country: string;
  state: string;
  social_links: ISocialLinks
  bio: string
}