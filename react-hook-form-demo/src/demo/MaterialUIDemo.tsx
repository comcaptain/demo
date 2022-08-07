
import { Control, Controller, FieldError, FieldPath, PathValue, useForm } from 'react-hook-form';
import { forwardRef, useEffect } from 'react';
import { Button, TextFieldProps, TextField, Autocomplete, AutocompleteProps, ChipTypeMap, TextareaAutosizeProps, AutocompleteValue, Checkbox, FormControlLabel, CheckboxProps } from '@mui/material';
interface Person
{
	name: string;
	favouriteAnimal: string;
	isMale: boolean;
}

interface AnimalOption
{
	title: string;
}

const options: AnimalOption[] = [
	{ title: "cat" },
	{ title: "dog" },
	{ title: "panda" },
	{ title: "tiger" },
	{ title: "fox" }
]

let renderCount = 0;
export default function MaterialUIDemo()
{
	renderCount++;
	const { register, watch, handleSubmit, formState: { errors }, control } = useForm<Person>({
		defaultValues: { favouriteAnimal: "panda", isMale: true }
	});
	useEffect(() =>
	{
		const { unsubscribe } = watch((data, { name, type }) =>
		{
			console.log("watch", data, name, type)
		});
		return unsubscribe;
	}, [watch]);
	return <form onSubmit={handleSubmit(data => console.log("Submit data", data))}>
		{renderCount}
		<div className='form-item'><TTextField label="Person" {...register("name", { required: "Required" })} fieldError={errors.name} /></div>
		<div className='form-item'><TSwitch label="Is Male" control={control} name="isMale" /></div>
		<div className="form-item">
			<Controller control={control} rules={{ required: "Required" }} name="favouriteAnimal" render={({ field: { onBlur, onChange, value, name, ref } }) => <Autocomplete
				options={options}
				getOptionLabel={o => o.title}
				isOptionEqualToValue={(option, value) => option.title === value.title}
				value={value ? { title: value } : null}
				onChange={(event, value) => onChange(value ? value.title : null)}
				renderInput={(params) => <TextField {...params} label="Favourite Animal" onBlur={onBlur} inputRef={ref} name={name} error={!!errors.favouriteAnimal} helperText={errors.favouriteAnimal?.message} />} />} />
		</div>
		<Button type="submit" variant='outlined'>Submit</Button>
	</form>
}

type TSwitchProps<TFormValues, TName extends FieldPath<TFormValues>> = Omit<CheckboxProps, "name"> & { label: string; name: TName; control: Control<TFormValues> };

function TSwitch<TFormValues, TName extends FieldPath<TFormValues>>({ control, label, name, ...otherProps }: TSwitchProps<TFormValues, TName>)
{
	// Controller is used instead of ref. Because if ref is used, then if initial value is true, the input checkbox.checked would be true but is displayed as unchecked
	return <Controller control={control} name={name} render={({ field: { onBlur, onChange, value, name, ref } }) =>
		<FormControlLabel control={<Checkbox {...otherProps} onBlur={onBlur} name={name} onChange={event => onChange(event.target.checked)} checked={!!value} inputRef={ref} />} label={label} />} />;
}

type TTextFieldProps = TextFieldProps & { fieldError?: FieldError };

const TTextField = forwardRef<HTMLInputElement, TTextFieldProps>(({ fieldError, ...otherProps }, ref) =>
{
	return <TextField inputRef={ref} {...otherProps} error={!!fieldError} helperText={fieldError?.message} />
});
