import { Applicant } from "./applicant.model";
import { Job } from "./job";

export interface Application {
  coverLetter: string;
  applicationDate: Date;

  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'INTERVIEW';

  applicant: Applicant;
  job: Job
}
