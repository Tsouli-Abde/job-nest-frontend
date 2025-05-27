export interface Application {
    coverLetter: string;
    applicationDate: Date;

    // Relations
    applicantId: string;
    jobId: string;

  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'INTERVIEW';

  applicant: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
    };

    job: {
      id: string;
      title: string;
      location: string;
      salaryMin: number;
      salaryMax: number;
      type: string;
      experienceLevel: string;
      postedAt: Date;
    };
  }
