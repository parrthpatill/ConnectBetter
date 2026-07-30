import "../styles/eventCard.css";

function EventCard({
    event,
    currentUser,
    onDelete,
}) {

    const isOwner =
        currentUser &&
        currentUser.id === event.user_id;

    return (
        <div className="event-card">

            <div className="event-header">

                <h3>{event.title}</h3>

                <span>{event.event_type}</span>

            </div>

            <p>{event.description}</p>

            <div className="event-footer">

                <div>

                    <strong>{event.name}</strong>

                    <br />

                    <span>created an event</span>

                    <br />

                    <small>
                        {new Date(event.event_date).toLocaleString()}
                    </small>

                </div>

                {isOwner && (
                    <button
                        className="delete-btn"
                        onClick={() => onDelete(event.id)}
                    >
                        Delete
                    </button>
                )}

            </div>

        </div>
    );
}

export default EventCard;