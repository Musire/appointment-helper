import { TestContextType } from "@/app/user/components/TestOrchestrator";
import { PanelOne, PanelTwo, Review } from "@/domains";
import { OrchestratorEnv, StepRegistry } from "../UI/orchestrator/Orchestrator";

export const testRegistry: StepRegistry<'panelOne' | 'panelTwo' | 'review', OrchestratorEnv<TestContextType>> = {
  panelOne: {
    mapProps: (env) => ({
      value: env.context.panelOne,
      onChange: (v: string) => env.onUpdate({ key: 'panelOne', value: v }),
      onBack: () => env.onBack()
    }),
    render: (props) => <PanelOne {...props} />
  },
  panelTwo: {
    mapProps: (env) => ({
      value: env.context.panelTwo,
      onChange: (v: string) => env.onUpdate({ key: 'panelTwo', value: v }),
      onBack: () => env.onBack()
    }),
    render: (props) => <PanelTwo {...props} />
  },
  review: {
    mapProps: (env) => ({
      value: env.context,
      onBack: () => env.onBack()
    }),
    render: (props) => <Review {...props} />
  }
};
