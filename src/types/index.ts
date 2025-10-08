export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    course: string;
}

export interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    age?: string;
    course?: string;
}
