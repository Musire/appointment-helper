export default function NextAppointment () {
    return (
        <article className="bg-darkest border-2 border-whitesmoke/15 p-6 flex space-x-4">
            <div className="bg-silver size-4 rounded-full" />
            <div className="flex flex-col space-y-1 -translate-y-1">
                <p className="text-alternate">Next Appointment</p>
                <p className="text-whitesmoke/87">{`10:00 AM - Joe Somebody`}</p>
                <p className="text-whitesmoke/60">{`Starts in 20 mins`}</p>
            </div>
            
        </article>
    );
}