import { useEffect, useState } from "react";


function useCounter(initialCount: number): [number, React.Dispatch<React.SetStateAction<number>>] {
	const [count, setCount] = useState(0);
	useEffect(() => {
		document.title = `You clicked ${count} times`;
	});
	return [count, setCount];
}

export default function Example() {
	const [count, setCount] = useCounter(0);

	return (
		<div>
			<p>Counter1: You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>
				Click me
			</button>
		</div>
	);
}