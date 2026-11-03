import { useNavigate } from "react-router-dom";
import type { EventFormData } from "../types/campus-event";
import { useEvents } from "../context/EventsContext";
import EventForm from "../components/forms/EventForm";

const emptyForm: EventFormData = {
  title: "",
  category: "",
  capacity: "",
  date: "",
  time: "",
  location: "",
  description: "",
};

function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  return (
    <>
      <EventForm
        initialData={emptyForm}
        submitText="Kaydet"
        onSubmit={(data) => {
          addEvent(data);
          navigate("/admin"); // kayıttan sonra tabloya dön
        }}
      />
    </>
  );
}

export default AddEventPage;
