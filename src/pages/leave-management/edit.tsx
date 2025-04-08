import { useNavigate } from "react-router-dom";
import Badge from "../../components/badge";
import Button from "../../components/button";
import DatePicker from "../../components/text-field/date-picker";
import Label from "../../components/text-field/label-field"
import SelectField from "../../components/text-field/select-field";
import TextArea from "../../components/text-field/text-area";
import { LEAVE_STATUS } from "../../configs";
import { MarkIcon } from "../../icons"

function LeaveManagementEdit() {
  const navigate = useNavigate();

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className='mb-5 lg:mb-7'>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Edit Leave Request
          </h3>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Fill out the form below to create a new leave form. Make sure to provide all the necessary information.
          </div>
        </div>
        
        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mt-5">
          <div className="flex-1">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Employee ID
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
            edcf765c-82d3-4c06-8102
            </p>
          </div>
          <div className="flex-1 mt-3 lg:mt-0">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Status
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              <Badge 
                color="success"
                className="capitalize"
              >
                {LEAVE_STATUS.APPROVED}
              </Badge>
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mt-5">
          <div className="flex-1">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              First Name
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Tonys
            </p>
          </div>
          <div className="flex-1 mt-3 lg:mt-0">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Last Name
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              Nguyen
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mt-5">
          <div className="flex-1">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Email
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              tony@gmail.com
            </p>
          </div>
          <div className="flex-1 mt-3 lg:mt-0">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Phone
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              +84 123 456 789
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mt-5">
          <div className="w-full flex-col justify-start items-start gap-1.5 flex">
            <Label className="flex text-xs leading-normal text-gray-500 dark:text-gray-400">Leave Start  <MarkIcon fontSize={8} /></Label>
            <DatePicker
              id="date-picker"
              placeholder="Select a date"
              onChange={(dates, currentDateString) => {
                // Handle your logic
                console.log({ dates, currentDateString });
              }}
              defaultDate={"2023-10-01"}
            />
          </div>
          <div className="w-full flex-col justify-start items-start gap-1.5 flex">
            <Label className="flex text-xs leading-normal text-gray-500 dark:text-gray-400">Leave End  <MarkIcon fontSize={8} /></Label>
            <DatePicker
              id="date-picker"
              placeholder="Select a date"
              onChange={(dates, currentDateString) => {
                // Handle your logic
                console.log({ dates, currentDateString });
              }}
              defaultDate={"2023-10-01"}
            />
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mt-5">
          <div className="w-full flex-col justify-start items-start gap-1.5 flex">
            <Label className="flex text-xs leading-normal text-gray-500 dark:text-gray-400">Leave Type  <MarkIcon fontSize={8} /></Label>
            <SelectField 
              id="leaveType"
              options={[
                { value: "annual", label: "Annual Leave" },
                { value: "sick", label: "Sick Leave" },
                { value: "vacation", label: "Vacation Leave" },
                { value: "personal", label: "Personal Leave" },
                { value: "unpaid", label: "Unpaid Leave" },
                { value: "emergency", label: "Emergency Leave" },
                { value: "other", label: "Other Leave" },
              ]}
              defaultValue="annual"
            />
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 mt-5">
          <div className="w-full flex-col justify-start items-start gap-1.5 flex">
            <Label className="flex text-xs leading-normal text-gray-500 dark:text-gray-400">Comments  <MarkIcon fontSize={8} /></Label>
            <TextArea
              className="w-full"
              placeholder="Comments"
              rows={3}
            />
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

export default LeaveManagementEdit