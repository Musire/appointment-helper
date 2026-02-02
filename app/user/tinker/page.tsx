import { TestOrchestrator } from "../components";

type TestPageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function TestPage ({ searchParams }: TestPageProps) {
    const query = await searchParams;

    return (
        <div className="">
            <TestOrchestrator query={query} />
        </div>
    );
}