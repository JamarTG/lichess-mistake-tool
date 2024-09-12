import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { FormData } from "../../types";
import Button from "../../components/Button";

interface ParamsFormProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  handleSubmit: (event: FormEvent<HTMLButtonElement>) => void;
}

const CriteriaForm: React.FC<ParamsFormProps> = ({
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
    <form className="p-6 mt-6">
      <div className=" border-white-900/10">
        <div className="space-y-2">
          <p className="text-gray-400 my-8">
            Use the form below to specify the criteria for selecting games to
            include in your training set.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-md font-medium leading-6 text-white"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
               
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="jamarithegreat"
                    autoComplete="username"
                    className="dark:[color-scheme:dark] bg-gray-900 block w-full h-11 rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                    value={formData.username}
                    onChange={(e) => handleNameChange(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-white/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="startdate"
                className="dark:[color-scheme:dark] block text-md font-medium leading-6 text-white"
              >
                Start Date
              </label>
              <div className="mt-2">
                <input
                  id="startdate"
                  name="startdate"
                  type="date"
                  autoComplete="address-level1"
                  className="dark:[color-scheme:dark] bg-gray-900 block w-full h-11 rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  value={formData.startDate}
                  onChange={(e) => {
                    handleDateChange("start", e);
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="enddate"
                className="block text-md font-medium leading-6 text-white"
              >
                End Date
              </label>
              <div className="mt-2">
                <input
                  id="enddate"
                  name="postal-code"
                  type="date"
                  autoComplete="enddate"
                  className="dark:[color-scheme:dark] bg-gray-900 block w-full h-11 rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  value={formData.endDate}
                  onChange={(e) => {
                    handleDateChange("end", e);
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-md font-medium leading-6 text-white"
              >
                Max number of games
              </label>
              <div className="mt-2">
                <input
                  id="numofgames"
                  name="numofgames"
                  type="text"
                  placeholder="20"
                  autoComplete="address-level2"
                  className="dark:[color-scheme:dark] bg-gray-900 block w-full h-11 rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  value={formData.maxNoGames}
                  onChange={(e) => handleMaxGamesChange(e)}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="border-white/10 pb-12 mt-5">
          <h2 className="mt-1 pb-4 text-lg leading-6 text-white font-semibold">
            How to include games in pool?
          </h2>

          <ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
            <li className="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
              <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-600">
                1
              </span>
              <span>
                <h3 className="font-medium leading-tight">Click</h3>
                <p className="text-md">Analysis Board</p>
              </span>
            </li>
            <li className="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
              <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-600">
                2
              </span>
              <span>
                <h3 className="font-medium leading-tight">Go to</h3>
                <p className="text-md">Computer Analysis Tab</p>
              </span>
            </li>
            <li className="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
              <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-600">
                3
              </span>
              <span>
                <h3 className="font-medium leading-tight">Click</h3>
                <p className="text-md">Request Computer Analysis</p>
              </span>
            </li>
          </ol>
        </div> */}
      </div>

      <div className="flex items-center justify-end gap-x-6">
        <Button type="button" level="secondary" size="sm">
          Cancel
        </Button>
        <Button size="lg" level="primary" onClick={(e) => handleSubmit(e)}>
          Start Session
        </Button>
      </div>
    </form>
  );
};

export default CriteriaForm;
