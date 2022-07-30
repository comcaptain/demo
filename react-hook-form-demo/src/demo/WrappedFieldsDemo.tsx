import { forwardRef } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';

interface Person
{
	name: string;
}
type CustomTextInputProps = ReturnType<UseFormRegister<Person>> & { label: string };
const CustomTextInput = forwardRef<HTMLInputElement, CustomTextInputProps>(({ onChange, onBlur, name, label }, ref) =>
{
	return <div>
		<label>{label}:</label>
		<input type="text" onChange={onChange} onBlur={onBlur} name={name} ref={ref} />
	</div>
});
let renderCount = 0;
export default function WrappedFieldsDemo()
{
	renderCount++;
	const { handleSubmit, register } = useForm<Person>();
	return <form onSubmit={handleSubmit(data => console.log(data))}>
		{renderCount}
		<CustomTextInput {...register("name")} label="Name" />
		<input type="submit" />
	</form>
}