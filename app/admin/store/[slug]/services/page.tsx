'use client';
import { useStore } from "@/stores";

export default function ServicePage () {
    const store = useStore()

    return (
      <div className="flex flex-col space-y-6 mt-6">
          <span className="flex items-center space-x-2 justify-end">
            <button type="button" className="btn">create category</button>
            <button type="button" className="btn">create service</button>
          </span>
          <section aria-labelledby="category-heading">
            <h3 id="category-heading">Categories</h3>
            <ul className="p-4">
              <li>Consultation</li>
            </ul>
          </section>
          <section aria-labelledby="service-heading">
            <h3 id="service-heading">Services</h3>
            <ul className="p-4">
              <li>Service vice</li>
            </ul>
          </section>
      </div>
    );
}