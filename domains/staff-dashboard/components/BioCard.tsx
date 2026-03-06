
type Props = {
    bio: string;
}

export default function BioCard ({ bio }: Props) {
    return (
        <div className="flex flex-col space-y-4 my-6">
            <h3 className="text-lg font-semibold text-main">Bio</h3>
            <p className="text-else">{bio}</p>
        </div>
    );
}