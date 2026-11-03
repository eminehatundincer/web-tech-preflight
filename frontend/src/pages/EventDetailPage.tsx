import { useParams } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import EventDetail from "../components/events/EventDetail";
import NotFoundPage from "./NotFoundPage";

// Bulur: adresteki id'yi okur, etkinliği bulur; yoksa "bulunamadı"
function EventDetailPage() {
  const { id } = useParams(); // 1. adres
  const { events } = useEvents(); // 2. veri
  const event = findEventById(events, id ?? "");
  if (!event) return <NotFoundPage />; // 3. yoksa

  return (
    <>
      <h2 className="bolum-baslik">{event.title}</h2>
      <EventDetail event={event} />
    </>
  );
}

export default EventDetailPage;
