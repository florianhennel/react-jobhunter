import { useSelector } from "react-redux";
import { formatCurrency } from "./OwnJob";

export default function EditJobInput({ type, name, input, value }) {
    const { noCompany, noTitle, noCity } = useSelector((state) => state.error);
    switch (type) {
        case "text":
            return (
                <label className=" flex flex-col">
                    <div className=" flex flex-row items-center justify-start gap-4">
                        <div className=" w-24 flex justify-start">{name}: </div>
                        <input
                            className="input input-sm input-bordered w-2/3"
                            type="text"
                            name={name}
                            value={value}
                            onInput={input}
                        ></input>
                    </div>

                    {((noCompany && name === "Company") ||
                        (noCity && name === "City") ||
                        (noTitle && name === "Position")) && (
                        <span className="block text-sm text-red-600 mt-1">
                            Please enter {name}
                        </span>
                    )}
                </label>
            );
        case "range":
            return (
                <label className=" flex flex-row items-center justify-start gap-4">
                    <div className=" w-24 flex justify-start">{name}: </div>
                    <input
                        className={` input input-sm input-bordered range range-primary w-60`}
                        type="range"
                        name={name}
                        min={0}
                        max="100"
                        value={Number(value) / 20000}
                        onInput={input}
                    ></input>
                    <div>{formatCurrency(value)}</div>
                </label>
            );

        case "select":
            return (
                <label className=" flex flex-row items-center justify-start gap-4">
                    <div className=" w-24 flex justify-start">{name}: </div>
                    <select
                        className="select"
                        name={name}
                        value={value}
                        onChange={input}
                        required
                    >
                        <option className=" bg-neutral">Full-Time</option>
                        <option className=" bg-neutral">Part-Time</option>
                        <option className=" bg-neutral">Internship</option>
                        <option className=" bg-neutral">Contract</option>
                    </select>
                </label>
            );

        case "checkbox":
            return (
                <label className=" flex flex-row items-center justify-start gap-4">
                    <div className=" w-24 flex justify-start">{name}: </div>
                    <input
                        type="checkbox"
                        name={name}
                        className="checkbox checkbox-primary"
                        checked={value === 1}
                        onChange={(e) => {
                            input(e);
                        }}
                    />
                </label>
            );
        case "textarea":
            return (
                <label className=" flex flex-row items-center justify-start gap-4">
                    <div className=" w-24 flex justify-start">{name}: </div>
                    <textarea
                        className="textarea textarea-bordered h-24 w-2/3"
                        placeholder="Describe the job"
                        name={name}
                        value={value}
                        onInput={input}
                    ></textarea>
                </label>
            );
        default:
            return <div>Valami hiba történt</div>;
    }
}
