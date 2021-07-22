import { useState } from "react";

export default function Example() {

	const [count1, setCount1] = useState(0);
	const [count2, setCount2] = useState(0);
	return (
		<div>
			<p>Counter1: You clicked {count1} times</p>
			<button onClick={() => setCount1(count1 + 1)}>
				Click me
			</button>
			<p>Counter2: You clicked {count2} times</p>
			<button onClick={() => setCount2(count2 + 1)}>
				Click me
			</button>
		</div>
	);

}