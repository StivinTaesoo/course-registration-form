import { useState } from "react";
import "./App.css";
import { courses } from "./data";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    course: string;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    age?: string;
    course?: string;
}

function RegistrationForm() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        course: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateEmail = (email: string): boolean => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        } else if (formData.firstName.trim().length < 2) {
            newErrors.firstName = "First name must be at least 2 characters";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        } else if (formData.lastName.trim().length < 2) {
            newErrors.lastName = "Last name must be at least 2 characters";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.age) {
            newErrors.age = "Age is required";
        } else {
            const ageNum = parseInt(formData.age);
            if (isNaN(ageNum)) {
                newErrors.age = "Please enter a valid age";
            } else if (ageNum < 18) {
                newErrors.age = "You must be at least 18 years old to register";
            } else if (ageNum > 120) {
                newErrors.age = "Please enter a valid age";
            }
        }

        if (!formData.course) {
            newErrors.course = "Please select a course";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }

        if (isSubmitted) {
            setIsSubmitted(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitted(true);
            setTimeout(() => {
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    age: "",
                    course: "",
                });
                setIsSubmitted(false);
            }, 3000);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-wrapper">
            <div className="registration-form">
                <h2 className="form-title">Course Registration</h2>

                {isSubmitted && (
                    <div className="success-message">
                        <svg
                            className="success-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <div>
                            <strong className="success-title">
                                Registration Successful!
                            </strong>
                            <p className="success-text">
                                Welcome {formData.firstName} {formData.lastName}
                                ! Check your email for course details.
                            </p>
                        </div>
                    </div>
                )}

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="firstName" className="form-label">
                            First Name <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Enter your first name"
                            className={`form-input ${
                                errors.firstName ? "error" : ""
                            }`}
                        />
                        {errors.firstName && (
                            <span className="error-message">
                                {errors.firstName}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName" className="form-label">
                            Last Name <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Enter your last name"
                            className={`form-input ${
                                errors.lastName ? "error" : ""
                            }`}
                        />
                        {errors.lastName && (
                            <span className="error-message">
                                {errors.lastName}
                            </span>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        Email Address <span className="required">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className={`form-input ${errors.email ? "error" : ""}`}
                    />
                    {errors.email && (
                        <span className="error-message">{errors.email}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="age" className="form-label">
                        Age <span className="required">*</span>
                    </label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Enter your age"
                        min="1"
                        max="120"
                        className={`form-input ${errors.age ? "error" : ""}`}
                    />
                    {errors.age && (
                        <span className="error-message">{errors.age}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="course" className="form-label">
                        Select Course <span className="required">*</span>
                    </label>
                    <select
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        className={`form-select ${
                            errors.course ? "error" : ""
                        }`}
                    >
                        {courses.map((course) => (
                            <option key={course.value} value={course.value}>
                                {course.label}
                            </option>
                        ))}
                    </select>
                    {errors.course && (
                        <span className="error-message">{errors.course}</span>
                    )}
                </div>

                <button className="submit-button" type="submit">
                    Register for Course
                </button>

                <p className="form-note">
                    <span className="required">*</span> Required fields
                </p>
            </div>
        </form>
    );
}

export default RegistrationForm;
