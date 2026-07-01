'use client';

import { Drawer } from "@/components/UI";
import { useDrawer } from "@/hooks";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ServiceCreation () {
    const { isMounted, animation, toggleDrawer } = useDrawer()
    return (
        <div className="absolute bottom-6 right-6 flex flex-col-reverse ">
            <button 
                type="button" 
                onClick={toggleDrawer}
                className="btn centered rounded-full size-14 self-end mt-6">
                <Plus />
            </button>
            <Drawer
                {...{isMounted}}
                {...{animation}}
            >
                <span className="flex items-center space-x-2 justify-end">
                    <Link 
                        href="services/new/category" 
                        className="btn"
                    >
                        + Category
                    </Link>
                    <Link 
                        href="services/new/service" 
                        className="btn"
                    >
                        + Service
                    </Link>
                </span>
            </Drawer>
        </div>
    );
}