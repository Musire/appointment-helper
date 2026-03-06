import { CustomInstagram } from "@/domains/staff-dashboard";
import { Mail, Smartphone } from "lucide-react";

export default function ContactInfo () {
    return (
        <ul className="py-6 flex flex-col space-y-4 text-else">
            <li className="font-semibold text-main">Contact Info</li>
            <li className="space-x-2 flex items-center ">
                <Mail strokeWidth={1} />
            <p className="">mark.johnson@example.com</p>
            </li>
            <li className="space-x-2 flex items-center ">
                <Smartphone strokeWidth={1} />
            <p className="">+52 (614) 123 4567</p>
            </li>
            <li className="space-x-2 flex items-center ">
                <CustomInstagram strokeWidth={1} />
            <p className="">@markthebarber</p>
            </li>
        </ul>
    );
}