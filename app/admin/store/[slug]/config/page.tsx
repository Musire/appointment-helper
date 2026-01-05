'use client';
import { useStore } from "@/stores";

export default function ConfigPage () {
    const store = useStore()
    const [startTime, endTime] = ['08:00', '08:00']
    const editHours = () => console.log('editing the hoop')

    return (
      <div className="py-6 flex flex-col ">
          <button onClick={editHours} type="button" className="btn self-end">Edit Hours</button>
          <section className="">
            <h3 className="capitalize">hours of operation</h3>
            <span className="p-6 flex space-x-4">
              <p className="">{`${startTime}-${endTime}`}</p>
            </span>
          </section>
      </div>
    );
}