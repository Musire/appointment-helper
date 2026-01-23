export default function InvitationCard () {
    return (
        <li className="bg-darkest border border-whitesmoke/20 normal-space min-w-56 w-full">
            <article className="grid grid-rows-2 grid-cols-[.75fr_2fr_1fr] gap-2 items-center p-4 relative">
                <div className="size-16 rounded-full border border-whitesmoke/20 bg-darker row-span-2" />
                <p className="col-start-2 text-whitesmoke/87 self-end   h-5">full name</p>
                <p className="col-start-2 text-whitesmoke/60 self-start text-sm  h-4">example@email.com</p>
                <p className=" px-2 py-1 rounded-full w-24 bg-darker border border-whitesmoke/20 centered col-start-3 row-start-1 capitalize ">pending</p>
                <button type="button" className=" text-center text-error-dark px-2 py-1 centered border hover:border-error-dark border-transparent  capitalize hover:cursor-pointer">revoke</button>
            </article>
        </li>
    );
}