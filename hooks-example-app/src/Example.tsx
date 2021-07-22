import { useEffect, useState } from "react";

export default function Example() {
	const [count, setCount] = useState(0);
	// Similar to componentDidMount and componentDidUpdate:
	useEffect(() => {
		// Update the document title using the browser API
		document.title = `You clicked ${count} times`;
	});

	return (
		<div>
			<p>Counter1: You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>
				Click me
			</button>
		</div>
	);
}