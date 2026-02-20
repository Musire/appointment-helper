'use client';

import BackButton from "./BackButton";

type HeaderProps = {
    title?: string,
    onBack?: () => void;
}

export default function Header ({ title, onBack }: HeaderProps) {
    return (
        <div className="w-full flex">
            {onBack && <BackButton onBack={onBack} />}
            <p className="mx-auto capitalize">{title}</p>
        </div>
    );
}