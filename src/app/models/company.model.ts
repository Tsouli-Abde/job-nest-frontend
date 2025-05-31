import { Job } from "./job";

export interface Company {
  companyName: string;
  email: string;
  phoneNumber?: string;
  industry?: string;
  username: string;
  password: string;
  jobs?: Job[];
}
