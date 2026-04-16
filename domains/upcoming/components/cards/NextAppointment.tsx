export default function NextAppointment () {
    return (
        <article className="surface-1 border-2 border-border p-6 flex space-x-4">
            <div className="bg-else size-4 rounded-full" />
            <div className="flex flex-col space-y-1 -translate-y-1">
                <p className="text-main">Next Appointment</p>
                <p className="text-else">{`10:00 AM - Joe Somebody`}</p>
                <p className="text-else">{`Starts in 20 mins`}</p>
            </div>
        </article>
    );
}