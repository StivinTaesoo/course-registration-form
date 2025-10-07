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

                <button className="submit-button" type="button">
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
