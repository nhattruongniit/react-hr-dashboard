import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import DatePicker from "../../components/text-field/date-picker";
import Label from "../../components/text-field/label-field"
import TextArea from "../../components/text-field/text-area";
import { MarkIcon } from "../../icons"
import GroupInputField from "../../components/text-field/group-input-field";
import FileInputField from "../../components/text-field/file-input-field";

function InvoiceCreate() {
  const navigate = useNavigate();

  return (
    <div className="lg:flex block justify-between w-full gap-5">
      <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className='mb-5 lg:mb-7'>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Create Invoice
          </h3>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Fill out the form below to create a new invoice form. Make sure to provide all the necessary information.
          </div>
        </div>
        
        <div className="w-full flex-col justify-start items-start gap-1.5 flex">
          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Employee ID
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              edcf765c-82d3-4c06-8102
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
            <Label className="flex text-xs leading-normal text-gray-500 dark:text-gray-400">Create Date  <MarkIcon fontSize={8} /></Label>
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
            <Label className="flex text-xs leading-normal text-gray-500 dark:text-gray-400">Amount  <MarkIcon fontSize={8} /></Label>
            {/* <Input
              type="number"
              className="w-full"
            /> */}
            <GroupInputField
              selectPosition="end"
              className="w-full"
              marks={["$", "€", "£", "VND"]}
              // onChange={handlePhoneNumberChange}
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
            Create Invoice
          </Button>
        </div>
      </div>

      <div className="flex-1 mt-4 lg:mt-0 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div>
          <div className='mb-5 lg:mb-7'>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Upload Invoice
            </h3>
          </div>
          <div className="w-full flex align-center justify-center text-white leavePieChart">
          </div>
        </div>
        <div className="max-w-full overflow-x-auto">
          <Label>Upload file</Label>
          <FileInputField className="custom-class" />
        </div>
        <div className="mt-4">
          <img src="/pdf/invoice.png" alt="invoice" />
      </div>
      </div>
    </div>
  ) 
}

export default InvoiceCreate