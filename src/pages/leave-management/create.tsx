import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";

import Button from "../../components/button";
import DatePicker from "../../components/text-field/date-picker";
import Label from "../../components/text-field/label-field"
import SelectField from "../../components/text-field/select-field";
import TextArea from "../../components/text-field/text-area";
import { MarkIcon } from "../../icons"
import { LEAVE_TYPE_COLOR, LEAVE_TYPE } from "../../configs";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/table/table";

const tableData: any = [
  {
    id: 1,
    name: LEAVE_TYPE.ANNUAL,
    allocate: "14",
    used: "2",
    balance: "12",
    color: LEAVE_TYPE_COLOR[0],
  },
  {
    id: 2,
    name: LEAVE_TYPE.SICK,
    allocate: "12",
    used: "3",
    balance: "9",
    color: LEAVE_TYPE_COLOR[1],
  },
  {
    id: 3,
    name: LEAVE_TYPE.VACATION,
    allocate: "10",
    used: "1",
    balance: "9",
    color: LEAVE_TYPE_COLOR[2],
  },
  {
    id: 4,
    name: LEAVE_TYPE.PERSONAL,
    allocate: "10",
    used: "0",
    balance: "10",
    color: LEAVE_TYPE_COLOR[3],
  },
  {
    id: 5,
    name: LEAVE_TYPE.UNPAID,
    allocate: "8",
    used: "0",
    balance: "8",
    color: LEAVE_TYPE_COLOR[4],
  },
  {
    id: 6,
    name: LEAVE_TYPE.OTHER,
    allocate: "6",
    used: "0",
    balance: "6",
    color: LEAVE_TYPE_COLOR[5],
  },
  {
    id: 7,
    name: LEAVE_TYPE.EMERGENCY,
    allocate: "5",
    used: "0",
    balance: "5",
    color: LEAVE_TYPE_COLOR[6],
  }
]

function LeavManagementCreate() {
  const navigate = useNavigate();
  const labels = [LEAVE_TYPE.ANNUAL, LEAVE_TYPE.SICK, LEAVE_TYPE.VACATION, LEAVE_TYPE.PERSONAL, LEAVE_TYPE.UNPAID, LEAVE_TYPE.OTHER, LEAVE_TYPE.EMERGENCY];
  const series = [14, 12, 10, 10, 8, 6, 5];
  const options: any = {
    chart: {
      type: "pie",
    },
    labels,
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "14px",
        colors: ["#ffffff"],
      },
      formatter: function (_: any, opts: any) {
        const value = opts.w.globals.series[opts.seriesIndex];
        return `${value}`;
      },
    },
    colors: LEAVE_TYPE_COLOR,
    tooltip: {
      custom: function ({ series, seriesIndex, w }: any) {
        const label = w.globals.labels[seriesIndex];
        const value = series[seriesIndex];
        const percent = ((value / series.reduce((a: number, b: number) => a + b, 0)) * 100).toFixed(1);

        return `
          <div style="padding: 8px; color: #fff;">
            <strong style="text-transform: capitalize; text-align: center">${label}</strong><br/>
            <b>${value}</b> (${percent}%)
          </div>
        `;
      },
    }
  };


  return (
    <div className="flex justify-between w-full gap-5">
      <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className='mb-5 lg:mb-7'>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Request for Leave
          </h3>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Fill out the form below to create a new leave form. Make sure to provide all the necessary information.
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
            />
          </div>
          <div className="w-full flex-col justify-start items-start gap-1.5 flex">
            <Label className="flex text-xs leading-normal text-gray-500 dark:text-gray-400">Type  <MarkIcon fontSize={8} /></Label>
            <SelectField 
              id="leaveType"
              options={[
                { value: "one-half", label: "One Half" },
                { value: "full", label: "Full" },
              ]}
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
            Apply for Leave
          </Button>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div>
          <div className='mb-5 lg:mb-7'>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Remaining Leave
            </h3>
          </div>
          <div className="w-full flex align-center justify-center text-white leavePieChart">
            <Chart options={options} series={series} type="pie" width="380" />
          </div>
        </div>
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Allocate
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Used
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Balance
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="px-4 py-2 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <span
                      style={{ backgroundColor: item.color }}
                      className="w-2.5 h-2.5 rounded-full inline-block mr-2" 
                    />
                    <span className="capitalize">{item.name}</span>
                  </TableCell>
                  <TableCell className="px-4 py-2 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {item.allocate}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {item.used}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {item.balance}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  ) 
}

export default LeavManagementCreate