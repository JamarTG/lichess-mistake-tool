import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { FormData } from "../../types";

interface ParamsFormProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  handleSubmit: (event: FormEvent<HTMLButtonElement>) => void;
}

const ParamsForm: React.FC<ParamsFormProps> = ({
  formData,
  setFormData,
  handleSubmit,
}) => {
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      username: e.target.value,
    }));
  };
  const handleDateChange = (
    dateType: "start" | "end",
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const date = event.target.value;
    if (dateType === "start") {
      setFormData((prevFormData) => ({ ...prevFormData, startDate: date }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, endDate: date }));
    }
  };

  const handleMaxGamesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      maxNoGames: parseInt(e.target.value),
    }));
  };

  return (
    <form className="max-w-md mx-auto">
      <h2 style={{ fontSize: 21 }} className="font-bold text-xl text-black ">
        Learn From Your Mistakes 2.0
      </h2>
      <br />
      <div className="relative z-0 w-full mb-10 group">
        <input
          type="text"
          name="floating_username"
          id="floating_username"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-neutral-600 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=""
          value={formData.username}
          onChange={(e) => handleNameChange(e)}
          required
        />
        <label
          htmlFor="floating_username"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Lichess Username
        </label>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-10 group">
          <input
            type="date"
            name="floating_start_date"
            id="floating_start_date"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-neutral-600 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formData.startDate}
            onChange={(e) => {
              handleDateChange("start", e);
            }}
            required
          />
          <label
            htmlFor="floating_start_date"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Start Date
          </label>
        </div>
        <div className="relative z-0 w-full mb-10 group">
          <input
            type="date"
            name="floating_end_date"
            id="floating_end_date"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-neutral-600 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={formData.endDate}
            onChange={(e) => {
              handleDateChange("end", e);
            }}
          />
          <label
            htmlFor="floating_end_date"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            End Date
          </label>
        </div>
      </div>
      <div className="relative z-0 w-full mb-10 group">
        <input
          type="number"
          name="floating_max_games"
          id="floating_max_games"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-neutral-600 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={formData.maxNoGames}
          onChange={(e) => handleMaxGamesChange(e)}
          required
        />
        <label
          htmlFor="floating_max_games"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Max # of games
        </label>
      </div>

      <button
        onClick={(e) => handleSubmit(e)}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Proceed To Trainer
      </button>
    </form>
  );
};

export default ParamsForm;
