import "./App.css";
import RegistrationForm from "./components/RegistrationForm";

function App() {
    return (
        <>
            <div className="app-container">
                <div className="app-header">
                    <h1 className="app-title">Speckledot Tech Academy</h1>
                    <p className="app-subtitle">
                        Enroll in our premium online courses
                    </p>
                </div>
                <RegistrationForm />
            </div>
        </>
    );
}

export default App;
