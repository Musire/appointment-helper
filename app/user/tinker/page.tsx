import { SearchParamsType } from "@/lib/queries/types";
import { TestOrchestrator } from "../components";

export default async function TestPage ({ searchParams }: SearchParamsType) {
    const query = await searchParams;

    return (
        <div className="">
            <TestOrchestrator query={query} />
        </div>
    );
}