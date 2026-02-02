'use client'

import { testRegistry } from "@/components/registries";
import { OrchestratorLogic } from "@/components/UI";
import { contextFromQuery, RouteParams, StepResolver } from "@/lib/orchestrator";

export type TestStep = 'panelOne' | 'panelTwo' | 'review';

export type TestContextType = {
    panelOne: string | undefined;
    panelTwo: string | undefined;
};

type TestOrchestratorProps = {
    query: RouteParams
}

export default function TestOrchestrator ({ query }: TestOrchestratorProps) {

    const context: TestContextType = contextFromQuery(query, {
        panelOne: undefined,
        panelTwo: undefined,
    })

    const resolver: StepResolver<TestContextType, TestStep> = (context) => {
        if (!context.panelOne) return 'panelOne';
        if (!context.panelTwo) return 'panelTwo';
        return 'review';
    };

    const handleSubmit = (data: TestContextType) => {
        console.log(data)
    }

    return (
        <OrchestratorLogic
            resolver={resolver}
            registry={testRegistry}
            onSubmit={handleSubmit}
            context={context}
        />
    );
}