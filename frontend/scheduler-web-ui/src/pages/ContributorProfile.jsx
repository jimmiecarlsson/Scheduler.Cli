import React from "react";

const ContributorProfile = ({ user }) => {
    return (
        <div className="container mt-4">
            <h3>Min profil</h3>

            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Adress:</strong> {user?.address}</p>
            <p><strong>Telefon:</strong> {user?.phone}</p>

            {user?.role === "Contributor" && (
                <>
                    <p><strong>Timpris:</strong> {user?.hourlyRate} kr</p>
                    <p><strong>Eventtillägg:</strong> {user?.eventAddon} kr</p>
                </>
            )}
        </div>
    );
};

export default ContributorProfile;
