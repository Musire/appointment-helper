type Props = {
    data: {
        name: string;
        job: string;
    }
}

export default function AvatarCard ({ data } : Props) {
    return (
        <article className="centered-col pb-6">
            {/* img placeholder */}
            <div className="w-48 h-60 bg-mid mx-auto mb-3"></div>
            <p className="text-lg text-main capitalize">{data.name}</p>
            <p className="text-els capitalize">{data.job}</p>
            <button type="button" className="btn w-48 mt-2">Edit Profile</button>
        </article>
    );
}