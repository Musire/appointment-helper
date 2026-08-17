import { LogoutButton } from "../buttons";

export default function PageHeader ({ title }: { title: string }) {
    return (
        <span className="spaced">
            <h1 className="text-3xl capitalize">{title}</h1>
            <LogoutButton />
        </span>
    );
}