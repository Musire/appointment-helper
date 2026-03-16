type Props = {
    step: number;
    max: number;
    title: string;
    subtitle: string;
}

export default function Header ({ step, max, title, subtitle }: Props) {
    return (
        <div className="stacked space-y-2" >
            <h3 className="text-primary">{`Step ${step} of ${max}`}</h3>
            <h2 className="text-2xl text-main">{title}</h2>
            <p className="text-else">{subtitle}</p>
        </div>
    );
}