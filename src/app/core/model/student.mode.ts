import { BusinessI } from './business.model';

export interface StudentI {
  _id: string;
  fullName: string;
  regNumber: string;
  removed: boolean;
  graduated: boolean;
  gender: string;
  studyYear: number;
  department: DepartmentI;
  profileImage: string;
  class: {
    name: string;
    cod: number;
  };
  organization: BusinessI;
  createdAt: string;
  sessionAdmitted: string;
  termAdmitted: string;
  semesterAdmitted: number;
  updatedAt: string;
  program: any;
  academicLevel: any;
  accountNumbersAssigned: any[];
  academicHistory: {
    academicClass: any;
    department: string;
    program: string;
    session: string;
    subClass: string;
    studyYear: number;
  }[];
}

export interface SchoolClassI {
  _id: string;
  name: string;
  code: number;
  type: string;
  subClass: SchoolSubclassI[];
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface SchoolSubclassI {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface DepartmentI {
  _id: string;
  name: string;
  code: string;
  programs: ProgramI[];
  createdAt: string;
  updatedAt: string;
}

export interface ProgramI {
  _id: string;
  name: string;
  code: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
}
