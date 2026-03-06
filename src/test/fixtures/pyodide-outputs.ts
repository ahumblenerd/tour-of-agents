/**
 * Sample raw stdout strings as Pyodide would produce them.
 * Mix of user print() output and __TRACE__: lines.
 */

export const simpleAgentOutput = `\
__TRACE__:{"id":"a1","timestamp":1000,"type":"agent_start","label":"Received: hello"}
Agent said: Hi there!
__TRACE__:{"id":"a2","timestamp":1001,"type":"agent_end","label":"Response: Hi there!"}`;

export const loopAgentOutput = `\
__TRACE__:{"id":"b1","timestamp":1000,"type":"agent_start","label":"Agent loop started with: count to 3"}
__TRACE__:{"id":"b2","timestamp":1001,"type":"state_update","label":"Iteration 1"}
Count: 1
__TRACE__:{"id":"b3","timestamp":1002,"type":"state_update","label":"Iteration 2"}
Count: 2
__TRACE__:{"id":"b4","timestamp":1003,"type":"state_update","label":"Iteration 3"}
Count: 3
__TRACE__:{"id":"b5","timestamp":1004,"type":"agent_end","label":"Done: Counted to 3"}
Final count: 3`;

export const toolAgentOutput = `\
__TRACE__:{"id":"c1","timestamp":1000,"type":"agent_start","label":"Agent started"}
__TRACE__:{"id":"c2","timestamp":1001,"type":"tool_call","label":"Call: calculator","data":{"tool":"calculator","args":{"expression":"6 * 7"}}}
__TRACE__:{"id":"c3","timestamp":1002,"type":"tool_result","label":"Result: calculator","data":{"tool":"calculator","result":42}}
The answer is 42
__TRACE__:{"id":"c4","timestamp":1003,"type":"agent_end","label":"Done: 42"}`;

export const errorOutput = `\
__TRACE__:{"id":"d1","timestamp":1000,"type":"agent_start","label":"Agent started"}
__TRACE__:{"id":"d2","timestamp":1001,"type":"error","label":"Tool not found: badtool"}
Error: Tool 'badtool' not found
__TRACE__:{"id":"d3","timestamp":1002,"type":"agent_end","label":"Failed"}`;

export const emptyOutput = "";

export const noTraceOutput = `\
Hello, world!
This is plain output with no trace events.
Done.`;
