import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import DatePicker from "../../components/text-field/date-picker";
import DropzoneComponent from "../../components/text-field/dropzone-field";
import Input from "../../components/text-field/input-field"
import Label from "../../components/text-field/label-field"
import SelectField from "../../components/text-field/select-field";
import TextArea from "../../components/text-field/text-area";
import { MarkIcon } from "../../icons"

function EmployeeCreate() {
  const navigate = useNavigate();
  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className='mb-5 lg:mb-7'>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Create New Employee
          </h3>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Fill out the form below to create a new employee. Make sure to provide all the necessary information.
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <h4 className="mb-5 text-md font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
              Personal Detail
            </h4>
            <div className="mb-5">
              <Label className="flex">Avatar</Label>
              <div className="">
                <DropzoneComponent />
              </div>
            </div>
            <div className="w-full flex-col justify-start items-start gap-8 flex">
              <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                  <Label className="flex">First Name  <MarkIcon fontSize={8} /></Label>
                  <Input
                    type="text"
                    className="w-full"
                  />
                </div>
                <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                  <Label className="flex">Last Name  <MarkIcon fontSize={8} /></Label>
                  <Input
                    type="text"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                  <Label className="flex">Date of Birth  <MarkIcon fontSize={8} /></Label>
                  <DatePicker
                    id="date-picker"
                    placeholder="Select a date"
                    onChange={(dates, currentDateString) => {
                      // Handle your logic
                      console.log({ dates, currentDateString });
                    }}
                  />
                </div>
                <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                  <Label className="flex">Birth Place  <MarkIcon fontSize={8} /></Label>
                  <Input
                    type="text"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                  <Label className="flex">Nationality  <MarkIcon fontSize={8} /></Label>
                  <SelectField 
                    id="nationality"
                    options={[
                      { value: "VN", label: "Vietnam" },
                      { value: "India", label: "India" },
                      { value: "Pakistan", label: "Pakistan" },
                      { value: "Nepal", label: "Nepal" },
                      { value: "Bhutan", label: "Bhutan" },
                    ]}
                  />
                </div>
                <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                  <Label className="flex">Gender  <MarkIcon fontSize={8} /></Label>
                  <SelectField 
                    id="nationality"
                    options={[
                      { value: "Male", label: "Male" },
                      { value: "Female", label: "Female" },
                      { value: "Other", label: "Other" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <h4 className="mb-5 text-md font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
              Contact Details
            </h4>
            <div className="w-full flex-col justify-start items-start gap-8 flex">
              <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                  <Label className="flex">Email  <MarkIcon fontSize={8} /></Label>
                  <Input
                    type="text"
                    className="w-full"
                  />
                </div>
                <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                  <Label className="flex">Phone Number  <MarkIcon fontSize={8} /></Label>
                  <Input
                    type="number"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="w-full flex items-center gap-2 cursor-pointer flex sm:flex-row flex-col dark:text-gray-400 text-sm">
                <div className="fa-classic fa-solid fa-plus fa-fw" /> Add other contact
              </div>
            </div>
          </div>

          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <h4 className="mb-5 text-md font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
              Address Details
            </h4>
            <div className="w-full flex-col justify-start items-start gap-8 flex">
              <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                  <Label className="flex">Address  <MarkIcon fontSize={8} /></Label>
                  <TextArea
                    className="w-full"
                    placeholder="Enter your address"
                    rows={3}
                  />
                </div>
              </div>

              <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                  <Label className="flex">Country  <MarkIcon fontSize={8} /></Label>
                  <Input
                    type="text"
                    className="w-full"
                  />
                </div>
                <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                  <Label className="flex">State  <MarkIcon fontSize={8} /></Label>
                  <Input
                    type="text"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 px-2 mt-6 justify-end">
          <Button size="sm" variant="outline" onClick={() => navigate(-1)}>
            Close
          </Button>
          <Button size="sm">
            Save Changes
          </Button>
        </div>
      </div>
    </>
  ) 
}

export default EmployeeCreate