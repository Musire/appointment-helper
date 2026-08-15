'use client';

export type CandidateCardProps = {
  data: { id: string; email: string; fullName: string | null; };
  onInvite: () => void;
}

export default function CandidateCard ({ data, onInvite }: CandidateCardProps) {
    const { fullName, email } = data

    return (
      <li className=" normal-space min-w-56 ">
          <article className="grid grid-rows-2 grid-cols-[25%_50%_25%] gap-x-2 place-content-center items-center p-4">
            <div className="size-12 rounded-full border border-whitesmoke/20 bg-darker row-span-2" />
            <p className="col-start-2 text-whitesmoke/87 px-2 truncate">{fullName}</p>
            <p className="col-start-2 text-whitesmoke/60 px-2 text-sm truncate">{email}</p>
            <button onClick={onInvite} type="button" className="btn row-span-2 col-start-3 row-start-1">invite</button>
          </article>
      </li>
    );
}