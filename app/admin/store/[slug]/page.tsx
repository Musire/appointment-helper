'use client'
import { useStore } from "@/stores";
import { Check, X } from "lucide-react";

export default function StoreDetails () {
  const { store, activation} = useStore()
  const { name, description, status } = store 

  const determineIcon = (check: boolean| undefined) => {
    if (check === undefined) return <X size={20} className="text-error-dark" />;
    return check ? <Check size={20} className="text-green-600" /> : <X size={20} className="text-error-dark" />
  }


  return (
    <div className="">
        { status === 'DRAFT' && (
          <article className="flex flex-col space-y-4 py-6">
            <p className="">Current Status is <span className="text-alternate">Draft</span></p>
            <p className="">In order to active you will have to fill out requirements for the store </p>
            <ul className="ml-6 mt-6 grid grid-cols-[1fr_4rem] w-48 capitalize">
              <li className="">configuration</li>
              <li className="">
                {determineIcon(activation?.hasConfig)}
              </li>
              <li className="">services</li>
              <li className="">
                {determineIcon(activation?.hasServices)}
              </li>
              <li className="">staff</li>
              <li className="">
                {determineIcon(activation?.hasActiveStaff)}
              </li>
            </ul>
          </article>
        )}
    </div>
  );
}