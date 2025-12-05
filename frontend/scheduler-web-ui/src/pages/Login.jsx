import { useState } from "react";
import { login } from "../api/scheduleApi";

export default function Login({ onLogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const res = await login(email, password);

            if (!res || res.status !== 200) {
                setError("Fel vid inloggning.");
                return;
            }

            setEmail("");
            setPassword("");
            onLogin();

        } catch {
            setError("Fel email eller lösenord.");
        }
    }

    return (
        <div className="container mt-5">
            <h2>Logga in</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Lösenord</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <button className="btn btn-primary" type="submit">
                    Logga in
                </button>
            </form>
        </div>
    );
}
