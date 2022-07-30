import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./BasicDemo.scss";

interface Person
{
	name: string;
	isMale: boolean;
	labels: string[];
	nationality: string;
	favouriteAnimal: string;
}

export default function BasicDemo()
{
	const { register, handleSubmit } = useForm<Person>({defaultValues: {name: "Tony", isMale: true, nationality: "China"}});
	return <form onSubmit={handleSubmit(formValues => console.log("Submit values", formValues))} id="basic-demo-form">
		<div className="form-item">Name: <input {...register("name",)} /></div>
		<div className="form-item"><label><input type="checkbox" {...register("isMale")} /> Is Male</label></div>
		<div className="form-item">
			<label><input type="checkbox" {...register("labels")} value="student" /> Student</label>
			<label><input type="checkbox" {...register("labels")} value="rich" /> Rich</label>
			<label><input type="checkbox" {...register("labels")} value="tall" /> Tall</label>
		</div>
		<div className="form-item">
			<label><input type="radio" {...register("nationality")} value="China" /> China</label>
			<label><input type="radio" {...register("nationality")} value="USA" /> USA</label>
			<label><input type="radio" {...register("nationality")} value="UK" /> UK</label>
		</div>
		<div className="form-item">
			Favourite animal: <select {...register("favouriteAnimal")}>
				<option value="panda">Panda</option>
				<option value="tiger">Tiger</option>
				<option value="cat">Cat</option>
				<option value="dog">Dog</option>
			</select>
		</div>
		<input type="submit" />
	</form>;
}