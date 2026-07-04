import type { VsCopy } from "../types";

const copy: VsCopy = {
  headToHead: `Strands is **model-driven**: you instantiate \`Agent(model, tools, system_prompt)\` and the model decides when to call tools and when to stop. CrewAI is **role-driven**: each \`Agent(role, goal, backstory)\` is shaped by prompt-level identity, and a \`Crew\` schedules \`Task\` objects across them. Strands hides the loop; CrewAI hides the orchestration around the loop.

CrewAI has the larger footprint — ~48k stars, MIT, shipping since October 2023, with an enterprise platform and $18M behind it. Strands is newer (May 2025, ~4.2k stars) but ships from AWS with native ties to Bedrock AgentCore for hosted runtime, identity, and observability. Both treat MCP as first-class; Strands wires it directly into the \`Agent\` surface, CrewAI exposes MCP servers as a tool source via its \`@tool\` layer.

Strands fits **single-agent or \`Swarm\`-of-equals** designs where the model leads, MCP is central, and deployment lands on AWS. CrewAI fits **named-specialist workflows** — researcher → writer → editor, collector → analyst → reporter — where role separation drives prompt quality and \`Crew(process=hierarchical)\` gives a manager agent control over delegation. Pick on shape: a model-led loop with optional handoff, or a predefined team of roles working a task list.`,
  pickAIf: `Pick aws-strands if your project lives or dies on AWS Bedrock deployment and MCP-first design.

- **AWS Bedrock AgentCore deploy**: hosted runtime, identity, and observability come bundled. If you're already in AWS, the deploy story is shorter than rolling your own on Lambda or ECS.
- **First-class MCP**: run an \`Agent\` as an MCP server or consume MCP servers as tools without writing the JSON-RPC-over-stdio handshake yourself.
- **Thin, model-driven SDK**: \`@tool\` decorator with type-hint-derived schemas and an implicit loop. No \`Crew\`, no \`Task\`, no DAG to define before you can ship.`,
  pickBIf: `Pick crewai if your workflow is genuinely a team of named specialists collaborating on a multi-step output.

- **Role-based agent design**: \`role\`, \`goal\`, and \`backstory\` shape distinct personas, which matters when "researcher" and "writer" need different tones inside the same pipeline.
- **\`Crew\` orchestration with delegation guardrails**: \`process=sequential\` or \`hierarchical\` plus scoped delegation keeps agents from handing off outside the crew or looping.
- **Built-in memory tiers**: \`ShortTermMemory\`, \`LongTermMemory\`, and \`EntityMemory\` cover the common patterns without you wiring a vector store yourself.`,
  sharedConcerns: `Both frameworks hide the agent loop. Strands lets the model drive iteration inside the SDK; CrewAI buries it inside \`Agent\` execution under the \`Crew\`. When a tool gets called wrong or the loop runs hot, you debug through framework internals instead of your own code.

Both also add dependency weight you may not need. CrewAI brings task orchestration, three memory subsystems, and a \`Crew\` runtime; Strands pulls Bedrock-friendly defaults and MCP plumbing. Pin versions carefully — both repos move fast, and breaking changes have shown up in minor releases.`,
};

export default copy;
