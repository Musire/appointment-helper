export type StoreBrief = {
    id: string;
    name: string;
    description: string | null;
}

type StoreCardProps = {
    data: StoreBrief
}

export default function StoreCard ({ data }: StoreCardProps) {
    const { id, name, description } = data
    return (
        <li className="">
            <article className="">
                <p className="">{ id }</p>
                <p className="">{ name }</p>
                <p className="">{ description }</p>
            </article>
        </li>
    );
}