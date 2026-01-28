'use client';

export type CandidateCardProps = {
  data: { id: string; email: string; fullName: string | null; };
  onInvite: () => void;
}

export default function CandidateCard ({ data, onInvite }: CandidateCardProps) {
    const { fullName, email } = data

    return (
      <li className="bg-darkest border border-whitesmoke/20 normal-space min-w-56 w-fit max-w-96">
          <article className="grid grid-rows-2 grid-cols-[1fr_2fr_1fr] gap-x-2 place-content-center items-center p-4">
          <div className="size-12 rounded-full border border-whitesmoke/20 bg-darker row-span-2" />
          <p className="col-start-2 text-whitesmoke/87 px-2">{fullName}</p>
          <p className="col-start-2 text-whitesmoke/60 px-2 text-sm">{email}</p>
          <button onClick={onInvite} type="button" className="btn row-span-2 col-start-3 row-start-1">invite</button>
          </article>
      </li>
    );
}