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

                <div className="event-author">

                    <div className="event-author-avatar">
                        {event.name.charAt(0).toUpperCase()}
                    </div>

                    <div>

                        <strong>{event.name}</strong>

                        <small>
                            {new Date(
                                event.event_date
                            ).toLocaleString()}
                        </small>

                    </div>

                </div>

                {isOwner && (

                    <button
                        className="delete-btn"
                        onClick={() => {
                            const confirmed = window.confirm(
                                "Are you sure you want to delete this event?"
                            );

                            if (confirmed) {
                                onDelete(event.id);
                            }
                        }}
                    >
                        Delete
                    </button>

                )}

            </div>

        </div>
    );

}

export default EventCard;