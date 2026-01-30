export type StaffBrief = {
    id: string;
    fullName: string | null;
    email: string;
    bio: string | null;
}

type StaffCardProps = {
    data: StaffBrief
}

export default function StaffCard ({ data }: StaffCardProps) {
    const { id, fullName, email, bio } = data
    return (
        <li className="">
            <article className="">
                <p className="">{ id }</p>
                <p className="">{ fullName }</p>
                <p className="">{ email }</p>
                <p className="">{ bio }</p>
            </article>
        </li>
    );
}