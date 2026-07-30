import { useEffect, useState } from "react";
import api from "../api/axios";

import "../styles/profile.css";

function Profile() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const response = await api.get("/profile");

                setProfile(response.data);

            } catch (err) {

                console.error("Failed to load profile:", err);

            } finally {

                setLoading(false);

            }

        };

        fetchProfile();

    }, []);

    if (loading) {

        return (
            <div className="profile-loading">
                Loading profile...
            </div>
        );

    }

    if (!profile) {

        return (
            <div className="profile-loading">
                Failed to load profile.
            </div>
        );

    }

    const {
        user,
        friends,
        events,
        recentEvents,
    } = profile;

    return (

        <div className="profile-container">

            <div className="profile-card">

                <div className="profile-avatar">

                    {user.name.charAt(0).toUpperCase()}

                </div>

                <h2>{user.name}</h2>

                <p>{user.email}</p>

                <small>
                    Joined{" "}
                    {new Date(user.created_at).toLocaleDateString()}
                </small>

            </div>

            <div className="profile-stats">

                <div className="stat-card">

                    <h3>{friends}</h3>

                    <p>Friends</p>

                </div>

                <div className="stat-card">

                    <h3>{events}</h3>

                    <p>Events</p>

                </div>

            </div>

            <div className="recent-events">

                <h3>Recent Events</h3>

                {
                    recentEvents.length === 0 ? (

                        <p>No events created yet.</p>

                    ) : (

                        recentEvents.map((event) => (

                            <div
                                key={event.id}
                                className="recent-event-card"
                            >

                                <strong>{event.title}</strong>

                                <br />

                                <small>
                                    {new Date(
                                        event.event_date
                                    ).toLocaleString()}
                                </small>

                            </div>

                        ))

                    )
                }

            </div>

        </div>

    );

}

export default Profile;